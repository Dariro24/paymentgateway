"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delivery = void 0;
class Delivery {
    id;
    transactionExternalId;
    address;
    city;
    country;
    postalCode;
    createdAt;
    constructor(id, transactionExternalId, address, city, country, postalCode, createdAt) {
        this.id = id;
        this.transactionExternalId = transactionExternalId;
        this.address = address;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
        this.createdAt = createdAt;
    }
}
exports.Delivery = Delivery;
//# sourceMappingURL=delivery.entity.js.map