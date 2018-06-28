import {Storage as StorageAPI} from '../../storage-api/model/Storage'
import {StoredProduct} from "../../storage-api/model/StoredProduct";
import {ObjectID} from "bson";
export class Storage implements StorageAPI {
    address: ObjectID;
    storedProduct: Map<ObjectID, StoredProduct[]>;
    private _id: ObjectID;

    constructor(storage: any) {
        this.address = storage.address;
        this.storedProduct = this.getData(storage);
        this._id = storage._id;
    }

    getProductsWithAmount(): Map<ObjectID, number> {
        const productMap: Map<ObjectID, number> = new Map();
        this.storedProduct.forEach((value: StoredProduct[], key: ObjectID) => {
                productMap.set(key, this.storedProduct.get(key).length )
            }
        );
        return productMap
    }

    getAmountWithProductId(productId: ObjectID): number {
        return this.storedProduct.get(ObjectID.createFromHexString(productId.toString())).length
    }

    reStockProduct(productId: ObjectID, amount: number): number {
        let storedNumber: number = 0;

        return storedNumber
    }

    private getData(storage: any): Map<ObjectID, StoredProduct[]> {
        const productMap: Map<ObjectID, StoredProduct[]> = new Map();
        storage.stored.forEach( (value: {productId: ObjectID, stored: StoredProduct[]}) => productMap.set(value.productId, value.stored));
        return productMap;
    }
}