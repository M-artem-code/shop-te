import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import type { StringValue } from 'ms';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;

  private COOKIE_DOMAIN: string;
  private JWT_ACCESS_TOKEN_TTL: StringValue;
  private JWT_REFRESH_TOKEN_TTL: StringValue;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async login(dto: AuthDto, res: Response) {
    const user = await this.validateUser(dto);

    const { accessToken } = this.auth(res, user.id);

    return { user, accessToken };
  }

  async register(dto: AuthDto, res: Response) {
    const oldUser = await this.userService.getByEmail(dto.email);

    if (oldUser) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const user = await this.userService.create(dto);

    const { accessToken } = this.auth(res, user.id);

    return { user, accessToken };
  }

  async getNewTokens(refreshToken: string) {
    const res = await this.jwt.verifyAsync<{ id: string }>(refreshToken);

    if (!res) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.getById(res.id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });
    const refreshToken = this.jwt.sign(data, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async validateOAuthLogin(
    email: string,
    name: string,
    picture: string,
    res: Response,
  ) {
    // 1️⃣ Ищем пользователя
    let user = await this.userService.getByEmail(email);

    // 2️⃣ Если нет — создаём
    if (!user) {
      const createdUser = await this.prisma.user.create({
        data: {
          email,
          name,
          picture,
          password: null, // OAuth без пароля
        },
      });

      // после create нам нужно получить его с include
      user = await this.userService.getById(createdUser.id);
    }
    // 3️⃣ Генерируем токены
    const { accessToken } = this.auth(res, user!.id);

    // 5️⃣ Возвращаем access token + user
    return {
      user,
      accessToken,
    };
  }

  private auth(res: Response, userId: string) {
    const { accessToken, refreshToken } = this.issueTokens(userId);

    this.addRefreshTokenToResponse(res, refreshToken);

    return { accessToken };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const exporesIn = new Date();
    exporesIn.setDate(exporesIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires: exporesIn,
      secure: true,
      sameSite: 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.JWT_REFRESH_TOKEN_TTL, '', {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}
