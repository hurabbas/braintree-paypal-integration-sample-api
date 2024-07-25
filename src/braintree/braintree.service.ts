import { Injectable } from '@nestjs/common';
import * as braintree from 'braintree';
import { PaymentDTO } from '../payment-gateway/dto';
import { IPaymentGateway, PaymentResult } from '../payment-gateway/interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BraintreeService implements IPaymentGateway {
  private gateway: braintree.BraintreeGateway;
  constructor(private readonly configService: ConfigService) {
    this.gateway = new braintree.BraintreeGateway({
      environment: braintree.Environment.Sandbox,
      merchantId: this.configService.get('BRAINTREE_MERCHANT_ID'),
      publicKey: this.configService.get('BRAINTREE_PUBLIC_KEY'),
      privateKey: this.configService.get('BRAINTREE_PRIVATE_KEY'),
    });
  }

  async processPayment(paymentDTO: PaymentDTO): Promise<PaymentResult> {
    const transactionResult = await this.gateway.transaction.sale({
      amount: paymentDTO.amount.toString(),
      paymentMethodNonce: 'fake-valid-nonce',
      creditCard: {
        number: paymentDTO.cardNumber,
        expirationMonth: paymentDTO.cardExpiration.split('/')[0],
        expirationYear: paymentDTO.cardExpiration.split('/')[1],
      },
      options: {
        submitForSettlement: true,
      },
    });

    const paymentResult: PaymentResult = {
      success: transactionResult.success,
      transactionId: transactionResult.transaction?.id,
      // ... other data as needed
    };

    return paymentResult;
  }
}
