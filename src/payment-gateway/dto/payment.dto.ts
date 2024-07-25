import { IsNotEmpty, IsEnum, IsNumber, IsString } from 'class-validator';
import { Currency, CardType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsEnum(Currency)
  @IsNotEmpty()
  currency: Currency;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerFullName: string;

  @ApiProperty()
  @IsEnum(CardType)
  @IsNotEmpty()
  cardType: CardType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cardHolderName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cardExpiration: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cardCcv: string;
}
