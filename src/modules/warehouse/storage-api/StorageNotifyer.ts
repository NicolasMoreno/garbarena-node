import {Request, Response} from "express";

export interface StorageNotifyer {
    notifySoldProduct(req: Request, res: Response): void
}