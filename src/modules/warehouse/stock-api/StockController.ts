import {Request, Response} from "express";
import {Stock} from "./model/Stock";
import {ObjectID} from "bson";

export interface StockController {
    getStockBySaleableId(req: Request, res: Response): void
    getStockPlacesByProductId(req: Request, res: Response): void
    getAllStock(req: Request, res: Response): void

    getStockPlaces(productId: ObjectID): Promise<Stock[]>
}