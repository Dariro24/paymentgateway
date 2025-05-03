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
exports.DeliveryController = void 0;
const common_1 = require("@nestjs/common");
const delivery_repository_1 = require("../../infrastructure/typeorm/repositories/delivery.repository");
const create_delivery_dto_1 = require("./dto/create-delivery.dto");
let DeliveryController = class DeliveryController {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(body) {
        const delivery = await this.repo.createDelivery({
            transactionExternalId: body.transactionExternalId,
            address: body.address,
            city: body.city,
            country: body.country,
            postalCode: body.postalCode,
        });
        return delivery;
    }
    async findByTransaction(transactionExternalId) {
        return this.repo.findByTransactionExternalId(transactionExternalId);
    }
};
exports.DeliveryController = DeliveryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_delivery_dto_1.CreateDeliveryDto]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/:transactionExternalId'),
    __param(0, (0, common_1.Param)('transactionExternalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "findByTransaction", null);
exports.DeliveryController = DeliveryController = __decorate([
    (0, common_1.Controller)('deliveries'),
    __metadata("design:paramtypes", [delivery_repository_1.DeliveryRepository])
], DeliveryController);
//# sourceMappingURL=delivery.controller.js.map