import {StoredProduct as StoredProductAPI} from "../../storage-api/model/StoredProduct";
import {ObjectID} from "bson";
import {ProductState} from "../../storage-api/model/ProductState";
import {WaitingToSell} from "./productState/WaitingToSell";
import {WaitingToGive} from "./productState/WaitingToGive";
import {WaitingToDeliver} from "./productState/WaitingToDeliver";
import {Delivered} from "./productState/Delivered";
export class StoredProduct implements StoredProductAPI {
    productId: ObjectID;
    state: ProductState;

    private readonly _id: ObjectID;

    constructor(storedProduct: any) {
        this.productId = storedProduct.productId;
        this._id = storedProduct._id;
        this.state = this.getState(storedProduct.state);
    }

    sellProduct(viaDelivery: boolean): boolean {
        return this.state.sell(this,viaDelivery)
    }

    setState(state: ProductState): void {
        this.state = state;
    }

    withdrawProduct(amount: number): boolean {
        return this.state.giveProduct(this, amount)
    }

    private getState(state: any): ProductState {
        switch (state.stateName) {
            case 'WaitingToSell':
                return new WaitingToSell();
            case 'WaitingToGive':
                return new WaitingToGive(state['username']);
            case 'WaitingToDeliver':
                return new WaitingToDeliver(state['username']);
            case 'Delivered':
                return new Delivered();
            default:
                this.state = state;
        }
    }

    getId(): ObjectID {
        return this._id;
    }
}