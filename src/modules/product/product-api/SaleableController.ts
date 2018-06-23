import {NextFunction, Request, Response} from "express";

export interface SaleableController {
    getProductById(req: Request, res: Response, next: NextFunction): void
    addProduct(req: Request, res: Response, next: NextFunction): void
    updateProduct(req: Request, res: Response, next: NextFunction): void
    getAllProducts(): void
}