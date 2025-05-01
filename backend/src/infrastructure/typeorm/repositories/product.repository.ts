import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../entities/product.orm-entity';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(ProductOrmEntity)
        private readonly repo: Repository<ProductOrmEntity>,
    ) {}

    async findAll(): Promise<ProductOrmEntity[]> {
        return await this.repo.find();
    }

    findById(id: number): Promise<ProductOrmEntity | null> {
        return this.repo.findOne({ where: { id } });
    }

    async save(product: ProductOrmEntity): Promise<ProductOrmEntity> {
        return this.repo.save(product);
    }

    async update(id: number, updateData: Partial<ProductOrmEntity>): Promise<void> {
        await this.repo.update(id, updateData);
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id);
    }
}
