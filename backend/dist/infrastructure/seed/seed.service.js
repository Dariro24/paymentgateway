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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_orm_entity_1 = require("../typeorm/entities/product.orm-entity");
let SeedService = class SeedService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async runSeed() {
        await this.productRepository.delete({});
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
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_orm_entity_1.ProductOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map