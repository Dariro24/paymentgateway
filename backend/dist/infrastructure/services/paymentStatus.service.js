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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatusService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let PaymentStatusService = class PaymentStatusService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    apiUrl = process.env.API_URL || 'https://api-sandbox.co.uat.wompi.dev/v1';
    async getTransactionStatus(transactionId) {
        const url = `${this.apiUrl}/transactions/${transactionId}`;
        try {
            const response = await this.httpService.get(url).toPromise();
            return response?.data ?? null;
        }
        catch (error) {
            console.error('Error consultando el estado de la transacción:', error);
            return null;
        }
    }
};
exports.PaymentStatusService = PaymentStatusService;
exports.PaymentStatusService = PaymentStatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PaymentStatusService);
//# sourceMappingURL=paymentStatus.service.js.map