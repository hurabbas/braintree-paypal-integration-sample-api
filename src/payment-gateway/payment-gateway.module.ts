import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaymentGatewayController } from './payment-gateway.controller';
import { PaypalModule } from '../paypal/paypal.module';
import { BraintreeModule } from '../braintree/braintree.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [OrderModule, PaypalModule, BraintreeModule],
  providers: [PaymentGatewayService],
  controllers: [PaymentGatewayController],
})
export class PaymentGatewayModule {}
