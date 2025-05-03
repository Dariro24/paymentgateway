"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const crypto = require("crypto");
let PaymentService = class PaymentService {
    apiUrl = process.env.API_URL || 'https://api-sandbox.co.uat.wompi.dev/v1';
    publicKey = process.env.PUBLIC_KEY || '';
    privateKey = process.env.PRIVATE_KEY || '';
    integrityKey = process.env.INTEGRITY_KEY || '';
    async getAcceptanceToken() {
        const url = `${this.apiUrl}/merchants/${this.publicKey}`;
        try {
            const response = await axios_1.default.get(url);
            return response.data.data.presigned_acceptance.acceptance_token;
        }
        catch (error) {
            console.error('❌ Error al obtener acceptance_token:', error.response?.data || error.message);
            throw error;
        }
    }
    generateSignature(amountInCents, currency, reference) {
        if (!this.integrityKey) {
            throw new Error('Integrity Key no configurada');
        }
        const amountStr = Math.round(amountInCents).toString();
        const currencyStr = currency.toUpperCase();
        const referenceStr = reference.toString();
        const signatureString = `${referenceStr}${amountStr}${currencyStr}${this.integrityKey}`;
        const signature = crypto
            .createHash('sha256')
            .update(signatureString)
            .digest('hex');
        return signature;
    }
    async getCardToken(params) {
        const url = `${this.apiUrl}/tokens/cards`;
        const body = {
            number: params.number,
            cvc: params.cvc,
            exp_month: params.expMonth,
            exp_year: params.expYear,
            card_holder: params.cardHolder,
            acceptance_token: params.acceptanceToken,
        };
        try {
            const response = await axios_1.default.post(url, body, {
                headers: {
                    Authorization: `Bearer ${this.publicKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.data.id;
        }
        catch (error) {
            console.error('❌ Error al generar token de tarjeta:', error.response?.data || error.message);
            throw error;
        }
    }
    async createTransaction(params) {
        const acceptanceToken = await this.getAcceptanceToken();
        const amountInCents = Math.round(params.amountCents);
        const currency = params.currency.toUpperCase();
        const signature = this.generateSignature(amountInCents, currency, params.reference);
        const body = {
            acceptance_token: acceptanceToken,
            amount_in_cents: amountInCents,
            currency: currency,
            customer_email: params.customerEmail,
            reference: params.reference,
            signature: signature,
            customer_data: {
                legal_id: params.customerLegalId,
                full_name: params.customerFullName,
                phone_number: params.customerPhone,
                legal_id_type: params.legalIdType,
            },
            payment_method: {
                type: 'CARD',
                user_type: 'PERSON',
                phone_number: params.customerPhone,
                installments: params.installments || '1',
                payment_description: params.paymentDescription,
                token: params.paymentMethodToken,
            },
        };
        try {
            const response = await axios_1.default.post(`${this.apiUrl}/transactions`, body, {
                headers: {
                    Authorization: `Bearer ${this.privateKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        }
        catch (error) {
            if (error.response?.data) {
                console.error('❌ Error al crear transacción:', JSON.stringify(error.response.data, null, 2));
            }
            else {
                console.error('❌ Error al crear transacción', error.message);
            }
            throw error;
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)()
], PaymentService);
//# sourceMappingURL=payment.service.js.map