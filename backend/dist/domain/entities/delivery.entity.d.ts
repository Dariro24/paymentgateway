export declare class Delivery {
    readonly id: number;
    readonly transactionExternalId: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    readonly createdAt: Date;
    constructor(id: number, transactionExternalId: string, address: string, city: string, country: string, postalCode: string, createdAt: Date);
}
