import { Repository } from 'typeorm';
import { DeliveryOrmEntity } from '../entities/delivery.orm-entity';
export declare class DeliveryRepository {
    private readonly repo;
    constructor(repo: Repository<DeliveryOrmEntity>);
    createDelivery(data: Partial<DeliveryOrmEntity>): Promise<DeliveryOrmEntity>;
    findByTransactionExternalId(transactionExternalId: string): Promise<DeliveryOrmEntity | null>;
    updateDelivery(id: number, data: Partial<DeliveryOrmEntity>): Promise<DeliveryOrmEntity>;
    deleteDelivery(id: number): Promise<void>;
    findAll(): Promise<DeliveryOrmEntity[]>;
    findById(id: number): Promise<DeliveryOrmEntity | null>;
}
