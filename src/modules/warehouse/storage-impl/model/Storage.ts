import {Storage as StorageAPI} from '../../storage-api/model/Storage'
import {StoredProduct} from "../../storage-api/model/StoredProduct";
import {ObjectID} from "bson";
import {WaitingToDeliver} from "./productState/WaitingToDeliver";
import {WaitingToGive} from "./productState/WaitingToGive";

export class Storage implements StorageAPI {
    address: ObjectID;
    storedProduct: Map<string, StoredProduct[]>;
    private _id: ObjectID;

    constructor(storage: any) {
        this.address = storage.address;
        this.storedProduct = this.getData(storage);
        this._id = storage._id;
    }

    getProductsWithAmount(): Map<ObjectID, number> {
        const productMap: Map<ObjectID, number> = new Map();
        this.storedProduct.forEach((value: StoredProduct[], key: string) => {
                productMap.set(new ObjectID(key), this.storedProduct.get(key).length )
            }
        );
        return productMap
    }

    getAmountWithProductId(productId: string): number {
        let storedProducts = this.storedProduct.get(productId);
        if(storedProducts) {
            let count: number = 0;
            this.storedProduct.get(productId).map( stored => stored.state.stateName === 'WaitingToSell' ? count++ : false);
            return count
        } else {
            return undefined
        }
    }

    reStockProduct(productId: ObjectID, amount: number): number {
        let storedNumber: number = 0;

        return storedNumber
    }

    markProductsAsSold(productId: string, amount: number, isDelivery: boolean): Storage {
        const storedProducts: StoredProduct[] = this.storedProduct.get(productId);
        let auxAmount = amount;
        storedProducts.map( stored => {
            if (stored.state.stateName === 'WaitingToSell' && auxAmount > 0) {
                stored.setState(isDelivery ? new WaitingToDeliver() : new WaitingToGive());
                auxAmount--;
                return stored;
            } else {
                return stored
            }
        });
        if (auxAmount == 0) {
            this.storedProduct.set(productId, storedProducts);
        }
        return this; // TODO Hacer en caso de no haber la cantidad adecuada de productos
    }

    private getData(storage: any): Map<string, StoredProduct[]> {
        const productMap: Map<string, StoredProduct[]> = new Map();
        storage.stored.forEach( (value: {productId: string, stored: StoredProduct[]}) => productMap.set(value.productId.toString(), value.stored));
        return productMap;
    }
}