import {Address} from "../../../person/api/model/Address";
import {StoredProduct} from "./StoredProduct";
import {ObjectID} from "bson";

export interface Storage {
    address: Address
    stored: StoredProduct[]

    getProductsWithAmount(): Map<ObjectID, number>
    reStockProduct(productId: ObjectID, amount: number): number
}