import {Request, Response} from "express";

export interface StockController {
    getStockBySaleableId(req: Request, res: Response): void
    getStockPlacesByProductId(req: Request, res: Response): void
    getAllStock(req: Request, res: Response): void
}