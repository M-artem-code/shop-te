import { IsEmail, IsString, IsOptional } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
