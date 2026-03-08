import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  async getAllStores() {
    return await this.prisma.store.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getById(storeId: string, userId: string) {
    const store = await this.prisma.store.findUnique({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!store) {
      throw new Error('Store not found');
    }
    return store;
  }

  async create(dto: CreateStoreDto, userId: string) {
    return this.prisma.store.create({
      data: {
        title: dto.title,
        userId,
      },
    });
  }

  async update(dto: UpdateStoreDto, storeId: string, userId: string) {
    await this.getById(storeId, userId);

    return this.prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
  }

  async delete(storeId: string, userId: string) {
    await this.getById(storeId, userId);

    return this.prisma.store.delete({
      where: {
        id: storeId,
      },
    });
  }
}
