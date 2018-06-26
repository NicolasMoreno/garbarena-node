import {SaleableController as SaleableControllerAPI} from "../product-api/SaleableController";
import {SaleableRepository} from "./repository/SaleableRepository";
import {Saleable} from "../product-api/model/Saleable";
import { Request, Response } from "express";
import {ComposedProduct} from "./model/ComposedProduct";
import {BaseProduct} from "./model/BaseProduct";


export class SaleableController implements SaleableControllerAPI {

    constructor(private repository: SaleableRepository) {}

    addProduct = (req: Request, res: Response) => {
        const saleable: Saleable = this.buildSaleableFromBody(req, res);
        this.repository.addProduct(saleable,
            (err, product) => {
                if (err) {
                    return res.status(400).send({
                        status: 400,
                        error: err.message
                    });
                }
                return res.send({
                    status: 200,
                    createdProduct: product
                });
            }, (errorMessage) => res.status(400).send({status: 400, error: errorMessage}))
    };

    getAllProducts(): void {
        return undefined;
    }

    getProductById(req: Request, res: Response): void {
        return undefined;
    }

    updateProduct(req: Request, res: Response): void {
        return undefined;
    }

    private buildSaleableFromBody(req: Request, res: Response): Saleable {
        const type = req.body.productType.value;
        if (type === 'Combo') {
            return new ComposedProduct(req.body)
        } else {
            return new BaseProduct(req.body)
        }
    }
}