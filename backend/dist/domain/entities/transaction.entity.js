"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    id;
    transactionExternalId;
    status;
    amount;
    customerEmail;
    productId;
    createdAt;
    constructor(id, transactionExternalId, status, amount, customerEmail, productId, createdAt) {
        this.id = id;
        this.transactionExternalId = transactionExternalId;
        this.status = status;
        this.amount = amount;
        this.customerEmail = customerEmail;
        this.productId = productId;
        this.createdAt = createdAt;
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.entity.js.map