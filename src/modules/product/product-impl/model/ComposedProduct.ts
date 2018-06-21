import {ComposedProduct as ComposedProductAPI} from '../../product-api/model/ComposedProduct'
import mongoose from "mongoose";
import {ObjectID} from "bson";
import {Saleable} from '../../product-api/model/Saleable'


export class ComposedProduct implements ComposedProductAPI {
    categoryId: ObjectID;
    id: string;
    name: string;
    price: number;
    products: Saleable[];

    addProduct(saleable: Saleable): Saleable[] {
        return undefined;
    }

    removeProduct(saleable: Saleable): Saleable[] {
        return undefined;
    }

    setPrice(price: number): void {
    }

}

const composedProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    categoryId: mongoose.Schema.Types.ObjectId,
    products: [mongoose.Schema.Types.Mixed]
});

const ComposedProductSchema = mongoose.model("ComposedProduct", composedProductSchema);
export default ComposedProductSchema