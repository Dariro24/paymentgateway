import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionOrmEntity } from '../../infrastructure/typeorm/entities/transaction.orm-entity';
import { TransactionRepository } from '../../infrastructure/typeorm/repositories/transaction.repository';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionOrmEntity])],
  controllers: [TransactionController],
  providers: [TransactionRepository],
})
export class TransactionModule {}
