import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionOrmEntity } from '../../infrastructure/typeorm/entities/transaction.orm-entity';
import { TransactionRepository } from '../../infrastructure/typeorm/repositories/transaction.repository';
import { TransactionController } from './transaction.controller';
import { PaymentService } from '../../infrastructure/services/payment.service';
import { HttpModule } from '@nestjs/axios';
import { PaymentStatusService } from '../../infrastructure/services/paymentStatus.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionOrmEntity]),
    HttpModule, 
  ],
  controllers: [TransactionController], 
  providers: [
    TransactionRepository,
    PaymentService,
    PaymentStatusService,
  ],
  exports: [PaymentService], 
})
export class TransactionModule {}