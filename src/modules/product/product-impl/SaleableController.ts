import {SaleableController as SaleableControllerAPI} from "../product-api/SaleableController";
import {SaleableRepository} from "./repository/SaleableRepository";
import {Saleable} from "../product-api/model/Saleable";
import { Request, Response } from "express";
import {ComposedProduct} from "./model/ComposedProduct";
import {BaseProduct} from "./model/BaseProduct";


export class SaleableController implements SaleableControllerAPI {

    constructor(private repository: SaleableRepository) {}

    addProduct = (req: Request, res: Response) => {
        const saleable: Saleable = this.buildSaleableFromBody(req.body);
        this.repository.addProduct(saleable,
            (err, admin) => {
                if (err) {
                    return res.status(400).send({
                        status: 400,
                        error: err.message
                    });
                }
                return res.send({
                    status: 200,
                    createdAdmin: admin
                });
            })
    };

    getAllProducts(): Saleable[] {
        return undefined;
    }

    getProductById(req: Request, res: Response): void {
        return undefined;
    }

    updateProduct(req: Request, res: Response): void {
        return undefined;
    }

    private buildSaleableFromBody(body: any): Saleable {
        if (body.productType.value === 'Combo') {
            return new ComposedProduct(body)
        } else {
            return new BaseProduct(body)
        }
    }
}