import {StorageController as StorageControllerAPI} from "../storage-api/StorageController";
import {Request, Response} from 'express'
import {StorageRepository} from "./repository/StorageRepository";

export class StorageController implements StorageControllerAPI {

    private repository: StorageRepository;

    constructor() {
        this.repository = StorageRepository.getInstance();
    }

    // TODO
    
    getAmountByProductId(req: Request, res: Response): void {
    }

    getStorage(req: Request, res: Response): void {
    }

    reduceAmountToProduct(req: Request, res: Response): void {
    }

    withdrawProduct(req: Request, res: Response): void {
    }

    addStorage(req: Request, res: Response): void {
    }
    
}