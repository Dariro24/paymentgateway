import { IsString, Length } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  transactionExternalId: string;

  @IsString()
  @Length(5, 255)
  address: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  postalCode: string;
}
