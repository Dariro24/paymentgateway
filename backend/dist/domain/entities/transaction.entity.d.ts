export declare class Transaction {
    readonly id: number;
    readonly transactionExternalId: string;
    status: 'PENDING' | 'APPROVED' | 'DECLINED';
    readonly amount: number;
    readonly customerEmail: string;
    readonly productId: number;
    readonly createdAt: Date;
    constructor(id: number, transactionExternalId: string, status: 'PENDING' | 'APPROVED' | 'DECLINED', amount: number, customerEmail: string, productId: number, createdAt: Date);
}
