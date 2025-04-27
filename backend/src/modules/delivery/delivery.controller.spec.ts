import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryController } from './delivery.controller';
import { DeliveryRepository } from '../../infrastructure/typeorm/repositories/delivery.repository';

describe('DeliveryController', () => {
  let controller: DeliveryController;
  let repo: DeliveryRepository;

  const mockDelivery = {
    id: 1,
    transactionExternalId: 'external-transaction-123',
    address: 'Calle Falsa 123',
    city: 'Springfield',
    country: 'USA',
    postalCode: '12345',
    createdAt: new Date(),
  };

  const mockRepo = {
    createDelivery: jest.fn().mockResolvedValue(mockDelivery),
    findByTransactionExternalId: jest.fn().mockResolvedValue(mockDelivery),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [
        {
          provide: DeliveryRepository,
          useValue: mockRepo,
        },
      ],
    }).compile();

    controller = module.get<DeliveryController>(DeliveryController);
    repo = module.get<DeliveryRepository>(DeliveryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear una nueva entrega', async () => {
    const dto = {
      transactionExternalId: 'external-transaction-123',
      address: 'Calle Falsa 123',
      city: 'Springfield',
      country: 'USA',
      postalCode: '12345',
    };

    const result = await controller.create(dto);

    expect(repo.createDelivery).toHaveBeenCalledWith(expect.objectContaining({
      transactionExternalId: dto.transactionExternalId,
      address: dto.address,
      city: dto.city,
      country: dto.country,
      postalCode: dto.postalCode,
    }));
    expect(result).not.toBeNull();
    expect(result?.transactionExternalId).toEqual('external-transaction-123');
  });

  it('debería retornar una entrega asociada a una transacción', async () => {
    const transactionExternalId = 'external-transaction-123';

    const result = await controller.findByTransaction(transactionExternalId);

    expect(repo.findByTransactionExternalId).toHaveBeenCalledWith(transactionExternalId);
    expect(result?.transactionExternalId).toEqual('external-transaction-123');
  });
});
