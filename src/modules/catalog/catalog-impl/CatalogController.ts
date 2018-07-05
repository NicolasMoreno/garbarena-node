import {CatalogController as CatalogControllerAPI} from "../catalog-api/CatalogController";
import {Request, Response} from 'express'
import {SaleableController} from "../../product/product-api/SaleableController";
import {StockController} from "../../warehouse/stock-api/StockController";
import {SaleableAmount} from "../catalog-api/model/SaleableAmount";
import {SaleableAmount as SaleableAmountImpl} from "./model/SaleableAmount";
import {Catalog} from "../catalog-api/model/Catalog";
import {Catalog as CatalogImpl} from "./model/Catalog";
import {ObjectID} from "bson";
import {StorageNotifyer} from "../../warehouse/storage-api/StorageNotifyer";
import {SalesController} from "../../sales/sales-api/SalesController";

export class CatalogController implements CatalogControllerAPI {

    constructor(private productController: SaleableController, private stockController: StockController,
                private storageNotifyer: StorageNotifyer, private saleController: SalesController) {}

    buySaleable = (req: Request, res: Response): void => {
        const params = req.body;
        const amount: number = params.amount;
        const storageId: ObjectID = params.storageId;
        const saleableId: string = params.saleableId;
        const isDelivery: boolean = params.isDelivery;
        this.storageNotifyer.checkStock(storageId, saleableId, amount,
            (hasStock) => {
               if (hasStock) {
                   const creditCardNumber: string = params.creditCardNumber;
                   const price: number = params.price;
                   const username: string = params.username;
                   this.saleController.startTransaction(creditCardNumber, price, saleableId, storageId, username,
                       (success: boolean) => {
                           this.storageNotifyer.notifySoldProduct(storageId, saleableId, amount, isDelivery,
                               (error, response) => {
                                   if (error) return res.status(500).send({status: 500, err: error});
                                   return res.send({
                                       status: 200,
                                       storage: response
                                   })
                               }, error => res.status(400).send({status: 400, message: error}))
                       }, error => res.status(400).send({status: 400, message: error}))

               } else {
                   return res.status(400).send({status: 400, message: 'No stock on storage'})
               }
            });

    };

    getCatalog = (req: Request, res: Response): void => {

    };

    getProductsByName = (req: Request, res: Response): void => {
        const productName: string = req.params.productName;
        this.productController.getProductByName(productName)
            .then( (products) => {
                if(products.length !== 0) {
                    Promise.all(
                        products.map(product => {
                            return new Promise( (resolve => {
                                this.stockController.getStockPlaces(product.id())
                                    .then( stockPlaces => {
                                        const saleables: SaleableAmount[] = stockPlaces.map( places => new SaleableAmountImpl(product, places));
                                        const catalog: Catalog = new CatalogImpl(saleables);
                                        resolve(catalog)
                                    })
                            }))
                        })
                    ).then( result => {
                        res.send({status: 200, catalog: result})
                    })
                } else {
                    res.send({status: 200, catalog: {products: []}})
                }
            })
    }
    
}