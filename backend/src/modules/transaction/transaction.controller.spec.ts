import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from '../../infrastructure/typeorm/repositories/transaction.repository';

describe('TransactionController', () => {
  let controller: TransactionController;
  let repo: TransactionRepository;

  const mockTransaction = {
    id: 1,
    transactionExternalId: 'external-123',
    status: 'PENDING',
    amount: 100,
    customerEmail: 'test@example.com',
    productId: 1,
    createdAt: new Date(),
  };

  const mockRepo = {
    createTransaction: jest.fn().mockResolvedValue(mockTransaction),
    updateTransactionStatus: jest.fn().mockResolvedValue(undefined),
    findByExternalId: jest.fn().mockResolvedValue(mockTransaction),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionRepository,
          useValue: mockRepo,
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    repo = module.get<TransactionRepository>(TransactionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear una nueva transacción', async () => {
    const dto = {
      transactionExternalId: 'external-123',
      amount: 100,
      customerEmail: 'test@example.com',
      productId: 1,
    };

    const result = await controller.create(dto);

    expect(repo.createTransaction).toHaveBeenCalledWith(expect.objectContaining({
      transactionExternalId: dto.transactionExternalId,
      amount: dto.amount,
      customerEmail: dto.customerEmail,
      productId: dto.productId,
      status: 'PENDING',
    }));
    expect(result.transactionExternalId).toEqual('external-123');
  });

  it('debería actualizar el estado de una transacción existente', async () => {
    const transactionExternalId = 'external-123';
    const status = 'APPROVED';
  
    // Mock del repositorio
    mockRepo.findByExternalId.mockResolvedValue(mockTransaction);
    mockRepo.updateTransactionStatus.mockResolvedValue({ affected: 1 });
  
    // 🔥 Cambia esto: Pasa `status` dentro de un objeto `{ status }`
    const result = await controller.updateStatus(transactionExternalId, { status });
  
    expect(repo.findByExternalId).toHaveBeenCalledWith(transactionExternalId);
    expect(repo.updateTransactionStatus).toHaveBeenCalledWith(mockTransaction.id, status);
    expect(result).toEqual({ message: 'Status updated' });
  });
  
  it('debería retornar una transacción existente', async () => {
    const transactionExternalId = 'external-123';
    mockRepo.findByExternalId = jest.fn().mockResolvedValue(mockTransaction);
  
    const result = await controller.findOne(transactionExternalId);
  
    expect(repo.findByExternalId).toHaveBeenCalledWith(transactionExternalId);
    expect(result?.transactionExternalId).toEqual('external-123'); 
  });

  it('debería retornar error si la transacción no existe al actualizar estado', async () => {
    mockRepo.findByExternalId = jest.fn().mockResolvedValue(null);

    const status = 'DECLINED';
    const transactionExternalId = 'non-existing';

    const result = await controller.updateStatus(transactionExternalId, status as any);

    expect(result).toEqual({ message: 'Transaction not found' });
  });
});
