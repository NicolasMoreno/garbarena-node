import {Request, Response} from "express";

export interface StorageController {
    addStorage(req: Request, res: Response): void
    getStorage(req: Request, res: Response): void
    getAmountByProductId(req: Request, res: Response): void
    reduceAmountToProduct(req: Request, res: Response): void
    withdrawProduct(req: Request, res: Response): void
}