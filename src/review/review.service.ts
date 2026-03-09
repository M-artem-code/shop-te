import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async getByStoreId(storeId: string) {
    return this.prisma.review.findMany({
      where: {
        storeId,
      },
      include: {
        user: true,
      },
    });
  }

  async getById(id: string, userId: string) {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        user: true,
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async create(
    dto: ReviewDto,
    userId: string,
    productId: string,
    storeId: string,
  ) {
    return this.prisma.review.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
        store: {
          connect: {
            id: storeId,
          },
        },
      },
    });
  }

  async delete(id: string, userId: string) {
    await this.getById(id, userId);

    return this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
