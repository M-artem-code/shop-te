import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({
    each: true,
    message: 'Каждый изображение должно быть строкой',
  })
  images: string[];

  @IsString()
  categoryId: string;

  @IsString()
  colorId: string;
}
