import {StockController as StockControllerAPI} from "../stock-api/StockController";
import {Request, Response} from 'express'
import {StorageController} from "../storage-api/StorageController";
import {ObjectID} from "bson";
import {Stock as StockInterface} from "../stock-api/model/Stock";
import {Stock} from "./model/Stock";


export class StockController implements StockControllerAPI {

    constructor(private storageController: StorageController) {}

    getAllStock = (req: Request, res: Response): void => {

    };

    getStockBySaleableId = (req: Request, res: Response): void => {
        this.storageController.getAmountByProductId(req,res)
    };

    getStockPlacesByProductId = (req: Request, res: Response): void => {
        const productId: ObjectID = req.params.productId;
        this.storageController.getStorageByProductId(productId)
            .then( storages => {
                const stocks: StockInterface[] = storages.map(storage =>
                    new Stock({amount: storage.getAmountWithProductId(productId.toString()), storageId: storage.getId()}))

                return res.send({
                    status: 200,
                    stock: stocks
                })
            })
    };

    getStockPlaces(productId: ObjectID): Promise<StockInterface[]> {
        return new Promise<StockInterface[]>( ((resolve, reject) => {
            this.storageController.getStorageByProductId(productId)
                .then( storages => {
                    const stocks: StockInterface[] = storages.map(storage => new Stock({amount: storage.getAmountWithProductId(productId.toString()), storageId: storage.getId()}));
                    resolve(stocks)
                })
        }))
    }
    
}