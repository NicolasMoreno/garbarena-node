import {StoredProduct} from "./StoredProduct";

export interface ProductState {
    giveProduct(prod: StoredProduct, amount: number): boolean
    sell(prod: StoredProduct, deliver: boolean): boolean
}