import { ProductRepository } from '../../infrastructure/typeorm/repositories/product.repository';
export declare class ProductController {
    private readonly repo;
    constructor(repo: ProductRepository);
    findAll(): Promise<import("../../infrastructure/typeorm/entities/product.orm-entity").ProductOrmEntity[]>;
}
