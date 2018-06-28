import {StoredProduct} from "./StoredProduct";
import {ObjectID} from "bson";

export interface Storage {
    address: ObjectID
    storedProduct: Map<ObjectID, StoredProduct[]>

    getProductsWithAmount(): Map<ObjectID, number>
    reStockProduct(productId: ObjectID, amount: number): number
    getAmountWithProductId(productId: ObjectID): number
}