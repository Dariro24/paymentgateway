import { IsEmail, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  transactionExternalId: string;

  @IsPositive()
  amount: number;

  @IsEmail()
  customerEmail: string;

  @IsNumber()
  productId: number;
}
