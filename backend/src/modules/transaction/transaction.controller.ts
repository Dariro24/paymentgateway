import { Body, Controller, Get, Post , Param} from '@nestjs/common';
import { TransactionRepository } from '../../infrastructure/typeorm/repositories/transaction.repository';
import { PaymentService } from '../../infrastructure/services/payment.service';
import { PaymentStatusService } from '../../infrastructure/services/paymentStatus.service';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly repo: TransactionRepository,
    private readonly paymentService: PaymentService,
    private readonly payStatus: PaymentStatusService,
  ) {}

  @Post('/pay')
  async pay(@Body() body: any) {
    /**
     * body esperado:
     * {
     *   number,
     *   cvc,
     *   exp_month,
     *   exp_year,
     *   card_holder,
     *   customerEmail,
     *   customerPhone,
     *   customerLegalId,
     *   legalIdType,
     *   currency,
     *   amountCents,
     *   reference,
     *   paymentDescription,
     *   productId
     *   installments,
     * }
     */

    // 1. Obtener token de tarjeta (el servicio se encarga de solicitar acceptance_token internamente)
    const acceptanceToken = await this.paymentService.getAcceptanceToken();
    const cardToken = await this.paymentService.getCardToken({
      number: body.number,
      cvc: body.cvc,
      expMonth: body.exp_month,
      expYear: body.exp_year,
      cardHolder: body.card_holder,
      acceptanceToken: acceptanceToken,
    });

    // 2. Crear transacción en el procesador de pagos primero
    const result = await this.paymentService.createTransaction({
      amountCents: body.amountCents,
      currency: body.currency || 'COP',
      customerEmail: body.customerEmail,
      paymentMethodToken: cardToken,
      customerLegalId: body.customerLegalId,
      customerFullName: body.card_holder,
      customerPhone: body.customerPhone,
      legalIdType: body.legalIdType,
      reference: body.reference,
      paymentDescription: body.paymentDescription,
      installments: body.installments || '1', 
    });

    const apiStatus = result.data.status.toUpperCase();
    const apiTransactionId = result.data.id;

    // 3. Crear transacción en base de datos con el ID de la transacción de la API
    const transaction = await this.repo.createTransaction({
      transactionExternalId: apiTransactionId, // Usamos el ID de la transacción de la API
      status: apiStatus === 'PENDING' ? 'PENDING' : apiStatus === 'APPROVED' ? 'APPROVED' : 'DECLINED',
      amount: body.amountCents,
      customerEmail: body.customerEmail,
      productId: body.productId,
    });

    // 4. Retornar respuesta
    return {
      transaction_reference: apiTransactionId,
      api_transaction_id: apiTransactionId,
      status: apiStatus,
      message: apiStatus === 'PENDING'
        ? '✅ Pago en proceso'
        : apiStatus === 'APPROVED'
        ? '✅ Pago aprobado'
        : '❌ Pago rechazado por api',
    };
  }
  @Get()
  async getAllTransactions() {
    const transactions = await this.repo.findAll();
    return transactions;
  }

  @Get('/id/:transactionId')
  async verifyTransaction(@Param('transactionId') transactionId: string) {
    
    const apiResponse = await this.payStatus.getTransactionStatus(transactionId);
    
    if (!apiResponse || !apiResponse.data) {
      return { message: '❌ No se encontró la transacción' };
    }

    const apiStatus = apiResponse.data.status.toUpperCase();

    // 2. Actualizar el estado en la base de datos
    await this.repo.updateTransactionStatus(transactionId, apiStatus);

    // 3. Retornar la información de la transacción
    return {
      transactionId,
      api_transaction_status: apiStatus,
      message: apiStatus === 'PENDING'
        ? '⚠️ Pago aún en proceso'
        : apiStatus === 'APPROVED'
        ? '✅ Pago aprobado'
        : '❌ Pago rechazado',
    };
  }
}