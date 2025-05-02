import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryOrmEntity } from '../../infrastructure/typeorm/entities/delivery.orm-entity';
import { DeliveryRepository } from '../../infrastructure/typeorm/repositories/delivery.repository';
import { DeliveryController } from './delivery.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryOrmEntity])],
  controllers: [DeliveryController],
  providers: [DeliveryRepository],
})
export class DeliveryModule {}
