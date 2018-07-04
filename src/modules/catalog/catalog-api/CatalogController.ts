
import {Request, Response} from "express";

export interface CatalogController {
    getCatalog(req: Request, res: Response): void
    getProductsByName(req: Request, res: Response): void
    buySaleable(req: Request, res: Response): void
}