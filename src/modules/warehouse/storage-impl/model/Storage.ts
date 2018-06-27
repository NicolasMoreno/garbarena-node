import {Storage as StorageAPI} from '../../storage-api/model/Storage'
import {Address} from "../../../person/api/model/Address";
import {StoredProduct} from "../../storage-api/model/StoredProduct";
import {ObjectID} from "bson";
export class Storage implements StorageAPI {
    address: Address;
    stored: StoredProduct[];
    private _id: ObjectID;

    constructor(storage: any) {
        this.address = storage.address;
        this.stored = storage.stored;
        this._id = storage._id;
    }

    getProductsWithAmount(): Map<ObjectID, number> {
        const productMap: Map<ObjectID, number> = new Map();
        this.stored.forEach(
            storedItem => {
                productMap.set(storedItem.productId, storedItem.amount)
            }
        );
        return productMap
    }

    reStockProduct(productId: ObjectID, amount: number): number {
        let storedNumber: number = 0;
        this.stored.map( storedItem => {
            if (storedItem.productId.equals(productId)) {
                storedNumber = storedItem.reStock(amount);
                return storedItem
            } else {
                return storedItem
            }
        });
        return storedNumber
    }

}