import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentDTO } from './dto';
import { PaymentResult } from './interface';
import { PaypalService } from '../paypal/paypal.service';
import { BraintreeService } from '../braintree/braintree.service';
import { OrderService } from '../order/order.service';
import { Logger } from 'nestjs-pino';

@Injectable()
export class PaymentGatewayService {
  constructor(
    private readonly orderService: OrderService,
    private readonly paypalService: PaypalService,
    private readonly braintreeService: BraintreeService,
    private readonly logger: Logger,
  ) {}

  async processPayment(paymentDTO: PaymentDTO): Promise<PaymentResult> {
    this.logger.debug(`paymentDT): ${JSON.stringify(paymentDTO)}`);
    if (paymentDTO.cardType === 'AMEX' && paymentDTO.currency !== 'USD') {
      throw new BadRequestException('AMEX is only supported for USD payments');
    }

    let gateway;
    if (paymentDTO.currency in ['USD', 'EUR', 'AUD']) {
      gateway = this.paypalService;
    } else {
      gateway = this.braintreeService;
    }

    try {
      const paymentResult = await gateway.processPayment(paymentDTO);
      this.logger.debug(`paymentResult: ${JSON.stringify(paymentResult)}`);
      const paymentGatewayUsed =
        gateway === this.paypalService ? 'PayPal' : 'Braintree';
      this.logger.debug(
        `paymentGatewayUsed: ${JSON.stringify(paymentGatewayUsed)}`,
      );
      if (paymentResult.success) {
        await this.orderService.saveOrder(
          paymentDTO,
          paymentResult,
          paymentGatewayUsed,
        );
      }
      return paymentResult;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else if (error instanceof Error) {
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Unknown Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
