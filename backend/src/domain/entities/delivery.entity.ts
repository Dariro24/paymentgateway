export class Delivery {
    constructor(
      public readonly id: number,
      public readonly transactionExternalId: string,
      public address: string,
      public city: string,
      public country: string,
      public postalCode: string,
      public readonly createdAt: Date,
    ) {}
  }