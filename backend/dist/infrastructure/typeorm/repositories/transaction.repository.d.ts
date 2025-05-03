import { Repository } from 'typeorm';
import { TransactionOrmEntity } from '../entities/transaction.orm-entity';
export declare class TransactionRepository {
    private readonly repo;
    constructor(repo: Repository<TransactionOrmEntity>);
    createTransaction(data: Partial<TransactionOrmEntity>): Promise<TransactionOrmEntity>;
    updateTransactionStatus(transactionId: string, status: "PENDING" | "APPROVED" | "DECLINED"): Promise<void>;
    findByExternalId(transactionExternalId: string): Promise<TransactionOrmEntity | null>;
    findById(id: number): Promise<TransactionOrmEntity | null>;
    deleteTransaction(id: number): Promise<void>;
    findAll(): Promise<TransactionOrmEntity[]>;
}
