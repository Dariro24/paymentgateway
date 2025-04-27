import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DeliveryRepository } from '../../infrastructure/typeorm/repositories/delivery.repository';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Controller('deliveries')
export class DeliveryController {
  constructor(private readonly repo: DeliveryRepository) {}

  @Post()
  async create(@Body() body: CreateDeliveryDto) {
    const delivery = await this.repo.createDelivery({
      transactionExternalId: body.transactionExternalId,
      address: body.address,
      city: body.city,
      country: body.country,
      postalCode: body.postalCode,
    });
    return delivery;
  }

  @Get('/:transactionExternalId')
  async findByTransaction(@Param('transactionExternalId') transactionExternalId: string) {
    return this.repo.findByTransactionExternalId(transactionExternalId);
  }
}
