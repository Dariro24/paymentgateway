import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrmEntity } from '../typeorm/entities/product.orm-entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  providers: [SeedService],
})
export class SeedModule {}
