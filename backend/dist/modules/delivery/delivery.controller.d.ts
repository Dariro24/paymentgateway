import { DeliveryRepository } from '../../infrastructure/typeorm/repositories/delivery.repository';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
export declare class DeliveryController {
    private readonly repo;
    constructor(repo: DeliveryRepository);
    create(body: CreateDeliveryDto): Promise<import("../../infrastructure/typeorm/entities/delivery.orm-entity").DeliveryOrmEntity>;
    findByTransaction(transactionExternalId: string): Promise<import("../../infrastructure/typeorm/entities/delivery.orm-entity").DeliveryOrmEntity | null>;
}
