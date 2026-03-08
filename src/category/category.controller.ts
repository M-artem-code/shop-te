import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth-decorator';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(200)
  @Auth()
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.categoryService.getByStoreId(storeId);
  }

  @HttpCode(200)
  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getById(id);
  }

  @HttpCode(200)
  @Auth()
  @Post(':storeId')
  async create(@Body() dto: CategoryDto, @Param('storeId') storeId: string) {
    return this.categoryService.create(storeId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Patch(':id')
  async update(@Body() dto: CategoryDto, @Param('id') id: string) {
    return this.categoryService.update(id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
