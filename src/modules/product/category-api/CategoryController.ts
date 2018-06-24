import {Request, Response} from "express";

export interface CategoryController {
    getProductsByCategory(req: Request, res: Response): void
    addCategory(req: Request, res: Response): void
    removeCategory(req: Request, res: Response): void
}