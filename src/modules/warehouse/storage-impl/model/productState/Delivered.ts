import {ProductState} from "../../../storage-api/model/ProductState";
import {StoredProduct} from "../../../storage-api/model/StoredProduct";

export class Delivered implements ProductState {
    giveProduct(prod: StoredProduct, amount: number): boolean {
        return false;
    }

    sell(prod: StoredProduct, deliver: boolean): boolean {
        return false;
    }

}