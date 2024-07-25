import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';
import { PaymentDTO } from '../payment-gateway/dto';
import { ConfigService } from '@nestjs/config';
import { IPaymentGateway, PaymentResult } from '../payment-gateway/interface';

@Injectable()
export class PaypalService implements IPaymentGateway {
  private client: paypal.core.PayPalHttpClient;

  constructor(private readonly configService: ConfigService) {
    const environment =
      this.configService.get('APP_ENV') === 'prod'
        ? new paypal.core.LiveEnvironment(
            this.configService.get('PAYPAL_CLIENT_ID'),
            this.configService.get('PAYPAL_CLIENT_SECRET'),
          )
        : new paypal.core.SandboxEnvironment(
            this.configService.get('PAYPAL_CLIENT_ID'),
            this.configService.get('PAYPAL_CLIENT_SECRET'),
          );
    this.client = new paypal.core.PayPalHttpClient(environment);
  }

  async processPayment(paymentDTO: PaymentDTO): Promise<PaymentResult> {
    // 1. Order Creation Logic
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody(this.buildRequestBody(paymentDTO));

    const response = await this.client.execute(request);

    // 2. Capture Logic (Optional, adjust if needed)
    const captureRequest = new paypal.orders.OrdersCaptureRequest(
      response.result.id,
    );
    captureRequest.requestBody({});
    await this.client.execute(captureRequest);

    // 3. Construct PaymentResult
    const paymentResult: PaymentResult = {
      success: response.statusCode === 201,
      transactionId: response.result.id,
    };

    return paymentResult;
  }

  private buildRequestBody(paymentDTO: PaymentDTO) {
    return {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: paymentDTO.currency,
            value: paymentDTO.amount,
          },
        },
      ],
    };
  }
}
