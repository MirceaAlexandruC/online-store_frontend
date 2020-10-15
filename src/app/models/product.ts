export class Product {
    id: number;
    name: string;
    price: number;
    pictureUrl: string;
    categoryType: number;

    constructor(id: number, name: string, price: number, pictureUrl: string, categoryType: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.pictureUrl = pictureUrl;
        this.categoryType = categoryType;
    }
}

