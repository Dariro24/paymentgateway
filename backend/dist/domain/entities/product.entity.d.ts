export declare class Product {
    readonly id: number;
    private _name;
    private _description;
    private _price;
    private _stock;
    constructor(id: number, name: string, description: string, price: number, stock: number);
    get name(): string;
    set name(value: string);
    get description(): string;
    set description(value: string);
    get price(): number;
    set price(value: number);
    get stock(): number;
    set stock(value: number);
    decreaseStock(quantity: number): void;
    increaseStock(quantity: number): void;
}
