import {ObjectID} from "bson";
import {ProductState} from "./ProductState";

export interface StoredProduct {
    productId: ObjectID
    amount: number
    state: ProductState

    sellProduct(viaDelivery: boolean): boolean
    withdrawProduct(amount: number): boolean
    setState(state: ProductState): void
    reStock(amount: number): number

}