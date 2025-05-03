import { TransactionRepository } from '../../infrastructure/typeorm/repositories/transaction.repository';
import { PaymentService } from '../../infrastructure/services/payment.service';
import { PaymentStatusService } from '../../infrastructure/services/paymentStatus.service';
export declare class TransactionController {
    private readonly repo;
    private readonly paymentService;
    private readonly payStatus;
    constructor(repo: TransactionRepository, paymentService: PaymentService, payStatus: PaymentStatusService);
    pay(body: any): Promise<{
        transaction_reference: any;
        api_transaction_id: any;
        status: any;
        message: string;
    }>;
    getAllTransactions(): Promise<import("../../infrastructure/typeorm/entities/transaction.orm-entity").TransactionOrmEntity[]>;
    verifyTransaction(transactionId: string): Promise<{
        message: string;
        transactionId?: undefined;
        api_transaction_status?: undefined;
    } | {
        transactionId: string;
        api_transaction_status: any;
        message: string;
    }>;
}
