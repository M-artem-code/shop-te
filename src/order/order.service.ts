import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { YooCheckout } from '@a2seven/yoo-checkout';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createOrder(dto: OrderDto, userId: string) {
    const orderItem = dto.items.map((item) => ({
      quantity: item.quantity,
      price: item.price,
      product: {
        connect: {
          id: item.productId,
        },
      },
    }));

    const total = dto.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const order = await this.prisma.order.create({
      data: {
        total,
        user: {
          connect: {
            id: userId,
          },
        },
        items: {
          create: orderItem,
        },
      },
    });

    const shopId = this.configService.get<string>('YOUKASSA_SHOP_ID');
    const secretKey = this.configService.get<string>('YOUKASSA_SECRET_KEY');

    if (!shopId || !secretKey) {
      throw new Error('YooKassa credentials are not configured');
    }

    const checkout = new YooCheckout({
      shopId,
      secretKey,
    });

    const payment = await checkout.createPayment({
      amount: {
        value: total,
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: 'http://localhost:3000/thanks',
      },
      description: 'Order #' + order.id,
    });

    return payment;
  }
}
