import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TransactionRepository } from '../../infrastructure/typeorm/repositories/transaction.repository';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly repo: TransactionRepository) {}

  @Post()
  async create(@Body() body: any) {
    // En un caso real validamos input con DTOs
    const newTransaction = await this.repo.createTransaction({
      transactionExternalId: body.transactionExternalId,
      status: 'PENDING',
      amount: body.amount,
      customerEmail: body.customerEmail,
      productId: body.productId,
    });
    return newTransaction;
  }

  @Put('/:transactionExternalId')
  async updateStatus(
    @Param('transactionExternalId') transactionExternalId: string,
    @Body('status') status: 'APPROVED' | 'DECLINED',
  ) {
    const transaction = await this.repo.findByExternalId(transactionExternalId);
    if (!transaction) {
      return { message: 'Transaction not found' };
    }
    await this.repo.updateTransactionStatus(transaction.id, status);
    return { message: 'Status updated' };
  }

  @Get('/:transactionExternalId')
  async findOne(@Param('transactionExternalId') transactionExternalId: string) {
    return this.repo.findByExternalId(transactionExternalId);
  }
}
