export declare class TransactionOrmEntity {
    id: number;
    transactionExternalId: string;
    status: 'PENDING' | 'APPROVED' | 'DECLINED';
    amount: number;
    customerEmail: string;
    productId: number;
    createdAt: Date;
}
