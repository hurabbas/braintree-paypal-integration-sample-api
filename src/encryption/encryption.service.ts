import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm: string;
  private readonly secretKey: string;
  private readonly ivLength: number;

  constructor(private configService: ConfigService) {
    this.secretKey = this.configService.get<string>('ENCRYPTION_KEY');
    this.algorithm = this.configService.get<string>('ENCRYPTION_ALGORITHM');
    this.ivLength = this.configService.get<number>('ENCRYPTION_IV_LENGTH');
    if (!this.secretKey) {
      throw new NotFoundException(
        'Encryption key is not defined in the configuration',
      );
    }
  }

  async encrypt(text: string): Promise<string> {
    const iv = randomBytes(this.ivLength);
    const key = scryptSync(this.secretKey, 'salt', 32);
    const cipher = createCipheriv(this.algorithm, key, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    const result = {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
    };

    return JSON.stringify(result);
  }

  async decrypt(text: string): Promise<string> {
    const hash = JSON.parse(text);
    const iv = Buffer.from(hash.iv, 'hex');
    const key = scryptSync(this.secretKey, 'salt', 32);
    const decipher = createDecipheriv(this.algorithm, key, iv);

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(hash.content, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString();
  }
}
