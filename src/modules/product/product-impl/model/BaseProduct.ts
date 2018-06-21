import {BaseProduct as BaseProductAPI} from '../../product-api/model/BaseProduct';
import {Type} from './Type'
import mongoose from "mongoose";
import TypeSchema from './Type'
import {ObjectID} from "bson";


export class BaseProduct implements BaseProductAPI {
    categoryId: ObjectID;
    id: string;
    name: string;
    price: number;
    productType: Type;

    setPrice(price: number): void {
    }

    setProductType(type: Type): void {
    }

}

const baseProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    categoryId: mongoose.Schema.Types.ObjectId,
    type: TypeSchema,
});

const BaseProductSchema = mongoose.model("BaseProduct", baseProductSchema);
export default BaseProductSchema

