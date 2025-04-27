export class Transaction {
    constructor(
      public readonly id: number,
      public readonly transactionExternalId: string,
      public status: 'PENDING' | 'APPROVED' | 'DECLINED',
      public readonly amount: number,
      public readonly customerEmail: string,
      public readonly productId: number,
      public readonly createdAt: Date,
    ) {}
  }
  