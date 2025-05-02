import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrmEntity } from '../../infrastructure/typeorm/entities/product.orm-entity';
import { ProductRepository } from '../../infrastructure/typeorm/repositories/product.repository';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  controllers: [ProductController],
  providers: [ProductRepository],
})
export class ProductModule {}
