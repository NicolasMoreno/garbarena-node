import {ComposedProduct as ComposedProductAPI} from '../../product-api/model/ComposedProduct'
import mongoose from "mongoose";
import {ObjectID} from "bson";
import {Saleable} from '../../product-api/model/Saleable'
import TypeSchema, {Type} from "./Type";


export class ComposedProduct implements ComposedProductAPI {
    categoryId: ObjectID;
    id: ObjectID;
    name: string;
    price: number;
    products: Saleable[];
    productType: Type;

    constructor(baseProduct: any) {
        this.categoryId = baseProduct.categoryId;
        this.id = baseProduct.id;
        this.name = baseProduct.name;
        this.price = baseProduct.price;
        this.productType = new Type( {value: 'Combo'})
    }

    addProduct(saleable: Saleable): Saleable[] {
        this.products.push(saleable);
        return this.products;
    }

    removeProduct(saleable: Saleable): Saleable[] {
        this.products = this.products.filter(product => product.id !== saleable.id);
        return this.products
    }

    setPrice(price: number): void {
        this.price = 0;
        this.products.forEach( product => this.price += product.price);
        this.price += price;
    }

}

/*
const composedProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    categoryId: mongoose.Schema.Types.ObjectId,
    productType: {type: TypeSchema, required: true},
    products: {type: [mongoose.Schema.Types.Mixed], required: true}
});

const ComposedProductSchema = mongoose.model("ComposedProduct", composedProductSchema);
export default ComposedProductSchema*/
