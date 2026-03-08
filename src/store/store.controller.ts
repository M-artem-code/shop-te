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
import { StoreService } from './store.service';
import { Auth } from 'src/auth/decorators/auth-decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async getAllStores() {
    return this.storeService.getAllStores();
  }

  @HttpCode(200)
  @Auth()
  @Get('by-id/:id')
  async getById(
    @Param('id') storeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.storeService.getById(storeId, userId);
  }

  @HttpCode(200)
  @Auth()
  @Post('create')
  async create(@Body() dto: CreateStoreDto, @CurrentUser('id') userId: string) {
    return this.storeService.create(dto, userId);
  }

  @HttpCode(200)
  @Auth()
  @Patch(':id')
  async update(
    @Body() dto: UpdateStoreDto,
    @Param('id') storeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.storeService.update(dto, storeId, userId);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(
    @Param('id') storeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.storeService.delete(storeId, userId);
  }
}
