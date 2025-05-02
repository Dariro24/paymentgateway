import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionRepository } from '../../infrastructure/typeorm/repositories/transaction.repository';
import { PaymentService } from '../../infrastructure/services/payment.service';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly repo: TransactionRepository,
    private readonly paymentService: PaymentService,
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
}