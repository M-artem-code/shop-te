import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        stores: true,
        favorites: true,
        orders: true,
      },
    });
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        stores: true,
        favorites: true,
        orders: true,
      },
    });
    return user;
  }

  async toggleFavorite(productId: string, userId: string) {
    const user = await this.getById(userId);

    const isExist = user!.favorites.some(
      (favorite) => favorite.id === productId,
    );

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: isExist
          ? {
              disconnect: {
                id: productId,
              },
            }
          : {
              connect: {
                id: productId,
              },
            },
      },
    });
    return true;
  }

  async create(dto: AuthDto) {
    const createdUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password),
      },
    });
    return createdUser;
  }
}
