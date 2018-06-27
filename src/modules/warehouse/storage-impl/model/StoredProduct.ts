import {StoredProduct as StoredProductAPI} from "../../storage-api/model/StoredProduct";
import {ObjectID} from "bson";
import {ProductState} from "../../storage-api/model/ProductState";
export class StoredProduct implements StoredProductAPI {
    amount: number;
    productId: ObjectID;
    state: ProductState;

    constructor(storedProduct: any) {
        this.amount = storedProduct.amount;
        this.productId = storedProduct.productId;
        this.state = storedProduct.state;
    }

    reStock(amount: number): number {
        this.amount += amount;
        return this.amount;
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

}