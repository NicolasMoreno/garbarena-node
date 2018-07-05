import {ProductState} from "../../../storage-api/model/ProductState";
import {StoredProduct} from "../../../storage-api/model/StoredProduct";

export class WaitingToGive implements ProductState {

    private username: string = undefined;

    constructor(userSold: string) {
        this.username = userSold;
    }

    giveProduct(prod: StoredProduct, amount: number): boolean {
        return false;
    }

    sell(prod: StoredProduct, deliver: boolean): boolean {
        return false;
    }

    readonly stateName: string = 'WaitingToGive';

}