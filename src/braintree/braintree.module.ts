import { Module } from '@nestjs/common';
import { BraintreeService } from './braintree.service';

@Module({
  providers: [BraintreeService],
  exports: [BraintreeService],
})
export class BraintreeModule {}
