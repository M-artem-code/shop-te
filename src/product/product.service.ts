import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) return this.getSearchTermFilter(searchTerm);

    const products = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
        color: true,
        reviews: true,
      },
    });
    return products;
  }

  private getSearchTermFilter(searchTerm: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        category: true,
        color: true,
      },
    });
  }

  async getByStoreId(storeId: string) {
    return this.prisma.product.findMany({
      where: {
        storeId,
      },
      include: {
        category: true,
        color: true,
      },
    });
  }

  async getById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        color: true,
        reviews: true,
      },
    });

    if (!product) {
      throw new Error('product not found');
    }
    return product;
  }

  async getByCategory(categoryId: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          id: categoryId,
        },
      },
      include: {
        category: true,
      },
    });

    if (!products) throw new Error('products not found');

    return products;
  }

  async getMostPopular() {
    const mostPopular = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    const productsIds = mostPopular.map((item) => item.productId);

    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: productsIds,
        },
      },
      include: {
        category: true,
      },
    });
    return products;
  }

  async getSimilar(id: string) {
    const currentProduct = await this.getById(id);

    if (!currentProduct) throw new Error('product not found');

    const products = await this.prisma.product.findMany({
      where: {
        categoryId: currentProduct.categoryId,
        NOT: {
          id: currentProduct.id,
        },
      },
      include: {
        category: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  }

  async create(storeId: string, dto: ProductDto) {
    return this.prisma.color.create({
      data: {
        ...dto,
        storeId: storeId,
      },
    });
  }

  async update(id: string, dto: ProductDto) {
    await this.getById(id);

    return this.prisma.color.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return this.prisma.color.delete({
      where: {
        id,
      },
    });
  }
}
