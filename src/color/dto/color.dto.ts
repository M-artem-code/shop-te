import { IsString } from 'class-validator';

export class ColorDto {
  @IsString()
  name!: string;

  @IsString()
  value!: string;
}
