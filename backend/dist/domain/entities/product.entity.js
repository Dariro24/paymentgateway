"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    id;
    _name;
    _description;
    _price;
    _stock;
    constructor(id, name, description, price, stock) {
        this.id = id;
        this._name = name;
        this._description = description;
        this._price = price;
        this._stock = stock;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('Name cannot be empty');
        }
        this._name = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('Description cannot be empty');
        }
        this._description = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        if (value <= 0) {
            throw new Error('Price must be greater than zero');
        }
        this._price = value;
    }
    get stock() {
        return this._stock;
    }
    set stock(value) {
        if (value < 0) {
            throw new Error('Stock cannot be negative');
        }
        this._stock = value;
    }
    decreaseStock(quantity) {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        if (this._stock < quantity) {
            throw new Error('Not enough stock available');
        }
        this._stock -= quantity;
    }
    increaseStock(quantity) {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        this._stock += quantity;
    }
}
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map