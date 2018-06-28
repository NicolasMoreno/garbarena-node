import {StorageController as StorageControllerAPI} from "../storage-api/StorageController";
import {Request, Response} from 'express'
import {StorageRepository} from "./repository/StorageRepository";
import {Storage} from "../storage-api/model/Storage";
import {Storage as StorageImpl} from "./model/Storage";
import {ObjectID} from "bson";

export class StorageController implements StorageControllerAPI {

    private repository: StorageRepository;

    constructor() {
        this.repository = StorageRepository.getInstance();
    }

    // TODO
    
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
                const storagesArray: Storage[] = response.map( (storage: any) => new StorageImpl(storage));
                let amount: number = 0;
                storagesArray.forEach( storage => amount += storage.getAmountWithProductId(productId));
                return res.send({
                    status: 200,
                    productId: productId,
                    amount: amount
                })
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

    withdrawProduct(req: Request, res: Response): void {
    }

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

    private buildStorageFromBody(req: Request, res: Response): Storage {
        return new StorageImpl(req.body);
    }
}