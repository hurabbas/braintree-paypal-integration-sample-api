import { Global, Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { EncryptionController } from './encryption.controller';

@Global()
@Module({
  providers: [EncryptionService],
  controllers: [EncryptionController],
  exports: [EncryptionService],
})
export class EncryptionModule {}
