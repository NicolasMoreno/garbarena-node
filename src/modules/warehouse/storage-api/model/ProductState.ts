import {StoredProduct} from "./StoredProduct";

export interface ProductState {

    readonly stateName: string;
    giveProduct(prod: StoredProduct, amount: number): boolean
    sell(prod: StoredProduct, deliver: boolean): boolean
}