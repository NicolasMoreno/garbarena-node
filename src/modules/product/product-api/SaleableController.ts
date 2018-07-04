import {Request, Response} from "express";
import {Saleable} from "./model/Saleable";

export interface SaleableController {

    getProductById(req: Request, res: Response): void
    getProductByName(productName: string): Promise<Saleable[]>
    addProduct(req: Request, res: Response): void
    updateProduct(req: Request, res: Response): void
    getAllProducts(req: Request, res: Response): void
}