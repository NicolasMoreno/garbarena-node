import {Request, Response} from "express";

export interface SaleableController {
    getProductById(req: Request, res: Response): void
    addProduct(req: Request, res: Response): void
    updateProduct(req: Request, res: Response): void
    getAllProducts(req: Request, res: Response): void
}