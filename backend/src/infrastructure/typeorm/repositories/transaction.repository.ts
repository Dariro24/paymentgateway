import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionOrmEntity } from '../entities/transaction.orm-entity';

@Injectable()
export class TransactionRepository {
    constructor(
        @InjectRepository(TransactionOrmEntity)
        private readonly repo: Repository<TransactionOrmEntity>,
    ) { }

    async createTransaction(data: Partial<TransactionOrmEntity>): Promise<TransactionOrmEntity> {
        const transaction = this.repo.create(data);
        return this.repo.save(transaction);
    }

    async updateTransactionStatus(id: number, status: 'APPROVED' | 'DECLINED'): Promise<void> {
        await this.repo.update(id, { status });
    }

    async findByExternalId(transactionExternalId: string): Promise<TransactionOrmEntity | null> {
        return this.repo.findOne({ where: { transactionExternalId } });
    }

    async findById(id: number): Promise<TransactionOrmEntity | null> {
        return this.repo.findOne({ where: { id } });
    }

    async deleteTransaction(id: number): Promise<void> {
        await this.repo.delete(id);
    }

    async findAll(): Promise<TransactionOrmEntity[]> {
        return this.repo.find();
    }
}
