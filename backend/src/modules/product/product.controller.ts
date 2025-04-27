import { Controller, Get } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/typeorm/repositories/product.repository';

@Controller('products')
export class ProductController {
  constructor(private readonly repo: ProductRepository) {}

  @Get()
  async findAll() {
    return await this.repo.findAll();
  }
}
