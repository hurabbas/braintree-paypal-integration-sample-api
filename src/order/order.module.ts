import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { EncryptionModule } from '../encryption/encryption.module';

@Module({
  imports: [EncryptionModule],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
