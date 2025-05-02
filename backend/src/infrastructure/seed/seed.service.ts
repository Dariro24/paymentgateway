import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../typeorm/entities/product.orm-entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly productRepository: Repository<ProductOrmEntity>,
  ) {}

  async runSeed() {
    await this.productRepository.delete({}); // Limpia productos anteriores

    const dummyProducts = [
        {
            "name": "Auriculares Bluetooth Premium",
            "description": "Auriculares inalámbricos con cancelación de ruido activa y 30 horas de duración de batería.",
            "price": 199.99,
            "stock": 15
          },
          {
            "name": "Laptop Gamer RTX 4080",
            "description": "Laptop de alto rendimiento con pantalla 240Hz, Intel i9 y GPU NVIDIA RTX 4080.",
            "price": 2499.99,
            "stock": 8
          },
          {
            "name": "Smartphone Pro Max",
            "description": "Último modelo con cámara de 108MP, pantalla AMOLED 120Hz y carga rápida de 100W.",
            "price": 1199.99,
            "stock": 20
          },
          {
            "name": "Smartwatch Fitness Pro",
            "description": "Reloj inteligente con monitor de ritmo cardíaco, GPS integrado y resistencia al agua 5ATM.",
            "price": 179.99,
            "stock": 35
          },
          {
            "name": "Tablet 4K 12.9''",
            "description": "Tablet con pantalla 4K, procesador de última generación y soporte para lápiz óptico.",
            "price": 899.99,
            "stock": 12
          }
      
    ];

    const products = this.productRepository.create(dummyProducts);
    await this.productRepository.save(products);

    console.log('🚀 Seed completado: productos insertados');
  }
}
