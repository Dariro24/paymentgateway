export class Product {
    private _name: string;
    private _description: string;
    private _price: number;
    private _stock: number;

    constructor(
      public readonly id: number,
      name: string,
      description: string,
      price: number,
      stock: number,
    ) {
        this._name = name;
        this._description = description;
        this._price = price;
        this._stock = stock;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error('Name cannot be empty');
        }
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error('Description cannot be empty');
        }
        this._description = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        if (value <= 0) {
            throw new Error('Price must be greater than zero');
        }
        this._price = value;
    }

    get stock(): number {
        return this._stock;
    }

    set stock(value: number) {
        if (value < 0) {
            throw new Error('Stock cannot be negative');
        }
        this._stock = value;
    }

    public decreaseStock(quantity: number): void {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        if (this._stock < quantity) {
            throw new Error('Not enough stock available');
        }
        this._stock -= quantity;
    }

    public increaseStock(quantity: number): void {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        this._stock += quantity;
    }
  }