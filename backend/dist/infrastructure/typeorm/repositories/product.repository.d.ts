import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../entities/product.orm-entity';
export declare class ProductRepository {
    private readonly repo;
    constructor(repo: Repository<ProductOrmEntity>);
    findAll(): Promise<ProductOrmEntity[]>;
    findById(id: number): Promise<ProductOrmEntity | null>;
    save(product: ProductOrmEntity): Promise<ProductOrmEntity>;
    update(id: number, updateData: Partial<ProductOrmEntity>): Promise<void>;
    delete(id: number): Promise<void>;
}
