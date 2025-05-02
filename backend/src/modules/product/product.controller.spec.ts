import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductRepository } from '../../infrastructure/typeorm/repositories/product.repository';

describe('ProductController', () => {
  let controller: ProductController;
  let repo: ProductRepository;

  const mockRepo = {
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'Producto de prueba',
        description: 'Descripción del producto',
        price: 99.99,
        stock: 10,
      },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductRepository,
          useValue: mockRepo,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    repo = module.get<ProductRepository>(ProductRepository);
  });

  it('debería retornar una lista de productos', async () => {
    const result = await controller.findAll();
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('Producto de prueba');
  });
});
