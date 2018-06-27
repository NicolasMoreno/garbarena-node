import {ObjectID} from "bson";
import {Type} from "./Type";
import {Saleable} from "../../product-api/model/Saleable";


export class ComposedProductSchema {
    categoryId: ObjectID;
    name: string;
    price: number;
    products: Saleable[];
    productType: Type;

    private readonly _id: ObjectID;


    constructor(baseProduct: any) {
        this.categoryId = baseProduct.categoryId;
        this.name = baseProduct.name;
        this.products = baseProduct.products;
        this._id = baseProduct._id;
        this.productType = new Type( {value: 'Combo'})
    }

    setPrice(): void {
        this.price = 0;
        this.products.forEach( product => {
            if (product.productType.value === 'Combo') {
                (product as ComposedProductSchema).setPrice(); //TODO ?
                this.price += product.price
            } else {
                this.price += product.price
            }
        });
    }

    id() {
        return this._id;
    }
}