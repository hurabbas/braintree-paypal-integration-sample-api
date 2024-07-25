import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { PaymentDTO } from './dto';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaymentResult } from './interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentGatewayController {
  constructor(private readonly paymentGatewayService: PaymentGatewayService) {}

  @Post()
  async processPayment(
    @Body(new ValidationPipe()) paymentDTO: PaymentDTO,
  ): Promise<PaymentResult> {
    return this.paymentGatewayService.processPayment(paymentDTO);
  }
}
