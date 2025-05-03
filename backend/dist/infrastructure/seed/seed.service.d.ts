import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../typeorm/entities/product.orm-entity';
export declare class SeedService {
    private readonly productRepository;
    constructor(productRepository: Repository<ProductOrmEntity>);
    runSeed(): Promise<void>;
}
