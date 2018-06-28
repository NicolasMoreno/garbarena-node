import { Response} from "express";
import mongoose from "mongoose";
import {ObjectID} from "bson";
import {Storage} from "../../storage-api/model/Storage";
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

    public getProductInAllStorages(productId: ObjectID, callback: (error: any, response: any) => Response) {
        StorageSchema.find({'stored.productId': productId}, callback)
    }

    private getStorageInstance(storage: Storage): Promise<any> {
        return new Promise( ((resolve, reject) => {
            const auxStored: {productId: ObjectID, stored: StoredProduct[]}[] = [];
            storage.storedProduct.forEach( (value: StoredProduct[], key: ObjectID) => {
                auxStored.push({productId: key, stored: value});
            });
            resolve(new StorageSchema({
                address: storage.address,
                stored: auxStored
            }))
        }))
    }
}

const storageSchema = new mongoose.Schema({
    address: mongoose.Schema.Types.ObjectId,
    stored: [{
        productId: mongoose.Schema.Types.ObjectId,
        stored: [mongoose.Schema.Types.Mixed]
    }]
});

export const StorageSchema = mongoose.model('Storage', storageSchema);
