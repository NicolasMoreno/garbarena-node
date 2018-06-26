import {BaseProduct as BaseProductAPI} from '../../product-api/model/BaseProduct';
import {Type} from './Type'
import mongoose from "mongoose";
import TypeSchema from './Type'
import {ObjectID} from "bson";


export class BaseProduct implements BaseProductAPI {
    categoryId: ObjectID;
    id: ObjectID;
    name: string;
    price: number;
    productType: Type;

    private _id: ObjectID;

    constructor(baseProduct: any) {
        this.categoryId = baseProduct.categoryId;
        this.id = baseProduct.id;
        this._id = baseProduct._id;
        this.name = baseProduct.name;
        this.price = baseProduct.price;
        this.productType = baseProduct.productType
    }

    setPrice(price: number): void {
        this.price = price
    }

    setProductType(type: Type): void {
        this.productType = type
    }

}

/*const baseProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    categoryId: mongoose.Schema.Types.ObjectId,
    productType: {type: TypeSchema, required: true},
});

const BaseProductSchema = mongoose.model("BaseProduct", baseProductSchema);
export default BaseProductSchema*/

