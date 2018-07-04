import {StoredProduct} from "./StoredProduct";
import {ObjectID} from "bson";

export interface Storage {
    address: ObjectID
    storedProduct: Map<string, StoredProduct[]>

    getProductsWithAmount(): Map<ObjectID, number>
    reStockProduct(productId: ObjectID, amount: number): number
    getAmountWithProductId(productId: string): number
    markProductsAsSold(productId: string, amount: number, isDelivery: boolean): Storage
}