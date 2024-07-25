import { PaymentDTO } from '../dto';

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  errorMessage?: string;
}

export interface IPaymentGateway {
  processPayment(paymentDetails: PaymentDTO): Promise<PaymentResult>;
}
