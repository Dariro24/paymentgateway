import { IsEnum } from 'class-validator';

export class UpdateTransactionStatusDto {
  @IsEnum(['APPROVED', 'DECLINED'])
  status: 'APPROVED' | 'DECLINED';
}
