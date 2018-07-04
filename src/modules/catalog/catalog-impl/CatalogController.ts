import {CatalogController as CatalogControllerAPI} from "../catalog-api/CatalogController";
import {Request, Response} from 'express'
import {SaleableController} from "../../product/product-api/SaleableController";
import {StockController} from "../../warehouse/stock-api/StockController";
import {SaleableAmount} from "../catalog-api/model/SaleableAmount";
import {SaleableAmount as SaleableAmountImpl} from "./model/SaleableAmount";
import {Catalog} from "../catalog-api/model/Catalog";
import {Catalog as CatalogImpl} from "./model/Catalog";

export class CatalogController implements CatalogControllerAPI {

    constructor(private productController: SaleableController, private stockController: StockController) {}

    buySaleable = (req: Request, res: Response): void => {

    };

    getCatalog = (req: Request, res: Response): void => {

    };

    getProductsByName = (req: Request, res: Response): void => {
        const productName: string = req.params.productName;
        this.productController.getProductByName(productName)
            .then( (products) => {
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
            })
    }
    
}