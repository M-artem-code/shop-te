import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  // Главная статистика (карточки)
  async getMainStatistics(storeId: string) {
    const [revenue, products, categories, rating] = await Promise.all([
      this.prisma.order.aggregate({
        where: { storeId, status: 'PAYED' },
        _sum: { total: true },
      }),

      this.prisma.product.count({
        where: { storeId },
      }),

      this.prisma.category.count({
        where: { storeId },
      }),

      this.prisma.review.aggregate({
        where: { storeId },
        _avg: { rating: true },
      }),
    ]);

    return [
      {
        name: 'Выручка',
        value: revenue._sum.total || 0,
      },
      {
        name: 'Товары',
        value: products,
      },
      {
        name: 'Категории',
        value: categories,
      },
      {
        name: 'Средний рейтинг',
        value: rating._avg.rating || 0,
      },
    ];
  }

  // Статистика для графиков и последних пользователей
  async getMiddleStatistics(storeId: string) {
    // продажи за 30 дней (включая все статусы)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const orders = await this.prisma.order.findMany({
      where: {
        storeId,
        createdAt: { gte: thirtyDaysAgo },
      },
      select: {
        total: true,
        createdAt: true,
        userId: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // ---------- продажи по дням ----------
    const salesMap: Record<string, number> = {};

    for (const order of orders) {
      const date = order.createdAt.toISOString().split('T')[0];
      salesMap[date] = (salesMap[date] || 0) + order.total;
    }

    const monthlySales = Object.entries(salesMap).map(([dateStr, value]) => {
      const date = new Date(dateStr);
      const day = date.getDate();
      const month = date.toLocaleString('ru-RU', { month: 'short' }); // "июл"
      return {
        date: `${day} ${month}`,
        value,
      };
    });

    // ---------- последние пользователи ----------
    const usersGroup = await this.prisma.order.groupBy({
      by: ['userId'],
      where: { storeId },
      _sum: { total: true },
      orderBy: {
        _max: { createdAt: 'desc' },
      },
      take: 5,
    });

    const userIds = usersGroup
      .map((u) => u.userId)
      .filter((id): id is string => Boolean(id));

    const users = await this.prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        name: true,
        email: true,
        picture: true,
      },
    });

    const lastUsers = users.map((user) => {
      const group = usersGroup.find((g) => g.userId === user.id);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        total: group?._sum.total || 0,
      };
    });

    return {
      monthlySales,
      lastUsers,
    };
  }
}
