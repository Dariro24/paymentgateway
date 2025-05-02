import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryOrmEntity } from '../entities/delivery.orm-entity';

@Injectable()
export class DeliveryRepository {
    constructor(
        @InjectRepository(DeliveryOrmEntity)
        private readonly repo: Repository<DeliveryOrmEntity>,
    ) {}

    async createDelivery(data: Partial<DeliveryOrmEntity>): Promise<DeliveryOrmEntity> {
        const delivery = this.repo.create(data);
        return this.repo.save(delivery);
    }

    async findByTransactionExternalId(transactionExternalId: string): Promise<DeliveryOrmEntity | null> {
        return this.repo.findOne({ where: { transactionExternalId } });
    }

    async updateDelivery(id: number, data: Partial<DeliveryOrmEntity>): Promise<DeliveryOrmEntity> {
        await this.repo.update(id, data);
        return this.repo.findOneOrFail({ where: { id } });
    }

    async deleteDelivery(id: number): Promise<void> {
        await this.repo.delete(id);
    }

    async findAll(): Promise<DeliveryOrmEntity[]> {
        return this.repo.find();
    }

    async findById(id: number): Promise<DeliveryOrmEntity | null> {
        return this.repo.findOne({ where: { id } });
    }
}
