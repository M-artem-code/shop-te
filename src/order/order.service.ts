import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICapturePayment, YooCheckout } from '@a2seven/yoo-checkout';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment.status.dto';
import { EnumOrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  private readonly checkout: YooCheckout;
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const shopId = this.configService.get<string>('YOUKASSA_SHOP_ID');
    const secretKey = this.configService.get<string>('YOUKASSA_SECRET_KEY');
    if (!shopId || !secretKey) {
      throw new Error('YooKassa credentials are not configured');
    }
    this.checkout = new YooCheckout({ shopId, secretKey });
  }

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

    const payment = await this.checkout.createPayment({
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
  async updateStatus(dto: PaymentStatusDto) {
    if (dto.event === 'payment.waiting_for_capture') {
      const capturePayment: ICapturePayment = {
        amount: {
          value: dto.object.amount.value,
          currency: dto.object.amount.currency,
        },
      };
      const result = await this.checkout.capturePayment(
        dto.object.id,
        capturePayment,
      );
      return result;
    }
    if (dto.event === 'payment.succeeded') {
      const description = dto.object.description;
      const match = description?.match(/Order #(.+)/);
      const orderId = match ? match[1] : description?.split('#')[1];
      if (!orderId) {
        throw new Error('Invalid order description');
      }
      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: EnumOrderStatus.PAYED },
      });
      return true;
    }
    return true;
  }
}
