import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentResult } from '../payment-gateway/interface';
import { PaymentDTO } from '../payment-gateway/dto';
import { Order } from '@prisma/client';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}
  async saveOrder(
    orderDetails: PaymentDTO,
    paymentResult: PaymentResult,
    paymentGateway: string,
  ) {
    const encryptedData = await this.encryptSensitiveData(orderDetails);
    return (await this.prisma.order.create({
      data: {
        ...orderDetails,
        paymentGateway,
        cardNumber: encryptedData.cardNumber,
        cardCcv: encryptedData.cardCcv,
        paymentResult: JSON.stringify(paymentResult),
      },
    })) as Order;
  }

  private async encryptSensitiveData(orderDetails: PaymentDTO) {
    return {
      ...orderDetails,
      cardNumber: await this.encryptionService.encrypt(orderDetails.cardNumber),
      cardCcv: await this.encryptionService.encrypt(orderDetails.cardCcv),
    };
  }
}
