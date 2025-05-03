"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_repository_1 = require("../../infrastructure/typeorm/repositories/transaction.repository");
const payment_service_1 = require("../../infrastructure/services/payment.service");
const paymentStatus_service_1 = require("../../infrastructure/services/paymentStatus.service");
let TransactionController = class TransactionController {
    repo;
    paymentService;
    payStatus;
    constructor(repo, paymentService, payStatus) {
        this.repo = repo;
        this.paymentService = paymentService;
        this.payStatus = payStatus;
    }
    async pay(body) {
        const acceptanceToken = await this.paymentService.getAcceptanceToken();
        const cardToken = await this.paymentService.getCardToken({
            number: body.number,
            cvc: body.cvc,
            expMonth: body.exp_month,
            expYear: body.exp_year,
            cardHolder: body.card_holder,
            acceptanceToken: acceptanceToken,
        });
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
        const transaction = await this.repo.createTransaction({
            transactionExternalId: apiTransactionId,
            status: apiStatus === 'PENDING' ? 'PENDING' : apiStatus === 'APPROVED' ? 'APPROVED' : 'DECLINED',
            amount: body.amountCents,
            customerEmail: body.customerEmail,
            productId: body.productId,
        });
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
    async getAllTransactions() {
        const transactions = await this.repo.findAll();
        return transactions;
    }
    async verifyTransaction(transactionId) {
        const apiResponse = await this.payStatus.getTransactionStatus(transactionId);
        if (!apiResponse || !apiResponse.data) {
            return { message: '❌ No se encontró la transacción' };
        }
        const apiStatus = apiResponse.data.status.toUpperCase();
        await this.repo.updateTransactionStatus(transactionId, apiStatus);
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
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.Post)('/pay'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "pay", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getAllTransactions", null);
__decorate([
    (0, common_1.Get)('/id/:transactionId'),
    __param(0, (0, common_1.Param)('transactionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "verifyTransaction", null);
exports.TransactionController = TransactionController = __decorate([
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transaction_repository_1.TransactionRepository,
        payment_service_1.PaymentService,
        paymentStatus_service_1.PaymentStatusService])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map