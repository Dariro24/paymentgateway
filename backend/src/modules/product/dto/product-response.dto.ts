import { IsNumber, IsPositive, IsString } from 'class-validator';

export class ProductResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsPositive()
  price: number;

  @IsNumber()
  stock: number;
}
