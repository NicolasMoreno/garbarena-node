import { Response} from "express";
import mongoose from "mongoose";
import {ObjectID} from "bson";
import {Storage} from "../../storage-api/model/Storage";
import {Storage as StorageImpl} from "../../storage-impl/model/Storage"
import {StoredProduct} from "../../storage-api/model/StoredProduct";

export class StorageRepository {
    private static _instance: StorageRepository = new StorageRepository();

    constructor() {
        if(!StorageRepository._instance) {
            StorageRepository._instance = this
        }
    }

    public static getInstance(): StorageRepository {
        return this._instance;
    }

    public addStorage(storage: Storage, callback: (error: any, response: any) => Response) {
        this.getStorageInstance(storage).then(storageDocument => storageDocument.save(callback));
    }

    public getStorageById(storageId: ObjectID, callback: (error: any, response: any) => Response) {
        StorageSchema.findById(storageId, callback)
    }

    public getProductInAllStorages(productId: ObjectID, callback: (error: any, response: any) => any) {
        StorageSchema.find({'stored.productId': productId}, callback)
    }

    public markProductsAsSold(soldProducts: {storageId: ObjectID, productId: string, amount: number, isDelivery: boolean},
                              callback: (error: any, response: any) => Response,
                              error?: (error: string) => Response) {
        StorageSchema.findById(soldProducts.storageId, (error, storage) => {
            let storageInstance: Storage = new StorageImpl(storage);
            storageInstance = storageInstance.markProductsAsSold(soldProducts.productId, soldProducts.amount, soldProducts.isDelivery);
            const storageDoc = new StorageSchema(storageInstance);
            storageDoc.save(callback) // TODO Test
        })
    }

    private getStorageInstance(storage: Storage): Promise<any> {
        return new Promise( ((resolve, reject) => {
            const auxStored: {productId: string, elements: StoredProduct[]}[] = [];
            storage.storedProduct.forEach( (value: StoredProduct[], key: string) => {
                auxStored.push({productId: key, elements: value});
            });
            resolve(new StorageSchema({
                address: storage.address,
                stored: auxStored
            }))
        }))
    }
}

const storedSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    state: mongoose.Schema.Types.Mixed
});

const storageSchema = new mongoose.Schema({
    address: mongoose.Schema.Types.ObjectId,
    stored: [{
        productId: mongoose.Schema.Types.ObjectId,
        elements: [storedSchema]
    }]
});

export const StorageSchema = mongoose.model('Storage', storageSchema);
