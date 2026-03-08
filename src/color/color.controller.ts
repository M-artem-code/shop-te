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
import { ColorService } from './color.service';
import { Auth } from 'src/auth/decorators/auth-decorator';
import { ColorDto } from './dto/color.dto';

@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @HttpCode(200)
  @Auth()
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.colorService.getByStoreId(storeId);
  }

  @HttpCode(200)
  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.colorService.getById(id);
  }

  @HttpCode(200)
  @Auth()
  @Post(':storeId')
  async create(@Body() dto: ColorDto, @Param('storeId') storeId: string) {
    return this.colorService.create(storeId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Patch(':id')
  async update(@Body() dto: ColorDto, @Param('id') id: string) {
    return this.colorService.update(id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.colorService.delete(id);
  }
}
