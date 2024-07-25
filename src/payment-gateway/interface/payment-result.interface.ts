export interface PaymentResultInterface {
  success: boolean;
  transactionId?: string;
  errorMessage?: string;
  gatewayData?: any; // For additional gateway-specific response data
}
