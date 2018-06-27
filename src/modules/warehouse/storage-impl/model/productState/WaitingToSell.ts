import {ProductState} from "../../../storage-api/model/ProductState";
import {StoredProduct} from "../../../storage-api/model/StoredProduct";
import {WaitingToDeliver} from "./WaitingToDeliver";
import {WaitingToGive} from "./WaitingToGive";

export class WaitingToSell implements ProductState {
    giveProduct(prod: StoredProduct, amount: number): boolean {
        return false;
    }

    sell(prod: StoredProduct, deliver: boolean): boolean {
        deliver ? prod.setState(new WaitingToDeliver()) : prod.setState(new WaitingToGive());
        return true;
    }

}