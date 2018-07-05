import {StorageController as StorageControllerAPI} from "../storage-api/StorageController";
import {Request, Response} from 'express'
import {StorageRepository} from "./repository/StorageRepository";
import {Storage} from "../storage-api/model/Storage";
import {Storage as StorageImpl} from "./model/Storage";
import {ObjectID} from "bson";
import {StorageNotifyer} from "../storage-api/StorageNotifyer";

export class StorageController implements StorageControllerAPI,StorageNotifyer {

    private repository: StorageRepository;

    constructor() {
        this.repository = StorageRepository.getInstance();
    }

    getAmountByProductId = (req: Request, res: Response): void => {
        const productId: ObjectID = req.params.productId;
        this.repository.getProductInAllStorages(productId,
            (error, response) => {
                if (error) {
                    return res.status(500).send({
                        status: 500,
                        error: error
                    })
                }
                if (response) {
                    const storagesArray: Storage[] = response.map( (storage: any) => new StorageImpl(storage));
                    let amount: number = 0;
                    storagesArray.forEach( storage => amount += storage.getAmountWithProductId(productId.toString()));
                    return res.send({
                        status: 200,
                        productId: productId,
                        amount: amount
                    })
                } else {
                    return res.send({
                        status: 200,
                        productId: productId,
                        amount: 0
                    })
                }
            })
    };

    getStorage = (req: Request, res: Response): void  => {
        this.repository.getStorageById(req.params.storageId,
            (error: any, response: any) => {
            if (error) {
                return res.status(500).send({status: 500, error: error})
            }
            if (response) {
                return res.send({status: 200, storage: response})
            }
        })
    };

    reduceAmountToProduct(req: Request, res: Response): void {
    }

    withdrawProduct = (req: Request, res: Response): void => {};

    addStorage = (req: Request, res: Response): void => {
        const storage: Storage = this.buildStorageFromBody(req, res);
        this.repository.addStorage(storage,
            (err: any, storage: any) => {
                if (err) return res.status(500).send({status: 500, error: err});
                if (storage) {
                    return res.send({status: 200, storage: storage})
                }
            })
    };

    notifySoldProduct(storageId: ObjectID, saleableId: string, amount: number, isDelivery: boolean,
                      callback: (error: any, response: any) => any,
                      onError: (errorMessage: string) => any): void {
         //TODO Probably crash when delivery is false
            this.repository.markProductsAsSold({storageId: storageId, productId: saleableId, amount: amount, isDelivery: isDelivery},callback, onError)
    }

    checkStock(storageId: ObjectID, saleableId: string, amount: number, callback: (hasStock: boolean) => any): void {
        this.repository.getStorageById(storageId,
            (error, storageResponse) => {
                const storage: Storage = new StorageImpl(storageResponse);
                const amountAvailable: number = storage.getAmountWithProductId(saleableId);
                if (amountAvailable > amount)  callback(true);
                else callback(false)
            })
    }

    getStorageByProductId(storageId: ObjectID): Promise<Storage[]> {
        return new Promise<Storage[]>( (resolve, reject ) => {
            this.repository.getProductInAllStorages(storageId,
                (error, response) => {
                    if (error) {
                        reject(error)
                    } else {
                        const storages: Storage[] = (response as Storage[]).map(elem => new StorageImpl(elem));
                        resolve(storages)
                    }
                })
        });
    }

    addProductToStorage = (req: Request, res: Response): void => {
        const storageId: ObjectID = req.body.storageId;
        this.repository.getStorageById(storageId,
            (error, storage) => {
                if (error) return res.status(500).send({status: 500, error: error});
                const storageImpl: Storage = new StorageImpl(storage);
                const productId: string = req.body.saleableId;
                const amount: number = req.body.amount;
                storageImpl.reStockProduct(productId,amount);
                this.repository.updateStorage(storageImpl,
                    (error, response) => {
                        if (error) return res.status(500).send({status: 500, error: error});
                        return res.send({
                            status: 200,
                            storage: response
                        })
                    })
            })
    };

    private buildStorageFromBody(req: Request, res: Response): Storage {
        return new StorageImpl(req.body);
    }

}