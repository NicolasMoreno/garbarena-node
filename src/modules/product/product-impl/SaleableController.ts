import {SaleableController as SaleableControllerAPI} from "../product-api/SaleableController";
import {SaleableRepository} from "./repository/SaleableRepository";
import {Saleable} from "../product-api/model/Saleable";
import { Request, Response } from "express";
import {ComposedProduct} from "./model/ComposedProduct";
import {BaseProduct} from "./model/BaseProduct";


export class SaleableController implements SaleableControllerAPI {

    private repository: SaleableRepository;

    constructor() {
        this.repository = new SaleableRepository();
    }

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

    getAllProducts = (req: Request, res: Response): void => {
        this.repository.getAllProducts( (error: any, response: any) => {
            if(response) {
                return res.send({
                    status: 200,
                    products: response
                })
            } else {
                return res.status(500).send({
                    status: 500,
                    error: "Error obtaining all products"
                })
            }
        })
    };

    getProductById = (req: Request, res: Response) => {
        this.repository.getProductById(req.params.productId, (error, product) => {
            if (error) {
                return res.status(500).send({
                    status: 500,
                    error: error.message
                });
            }
            if (!product) {
                return res.status(404).send({
                    status: 404,
                    error: "Product with given id not exist"
                })
            }
            return res.send({
                status: 200,
                product: product
            });
        })
    };

    updateProduct = (req: Request, res: Response): void => {
        const saleableToUpdate: Saleable = this.buildSaleableFromBody(req,res);
        this.repository.updateProduct(saleableToUpdate,
            (error: any, response: any) => {
                if (error) {
                    return res.status(500).send({
                        status: 500,
                        error: error
                    })
                }
                if (response.ok) {
                    return res.send({
                        status: 200,
                        product: saleableToUpdate
                    })
                }
            }, (errorMessage) => {
                return res.status(500).send({
                    status: 500,
                    error: errorMessage
                })
            })
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