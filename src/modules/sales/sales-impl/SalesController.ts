import {SalesController as SalesControllerAPI} from "../sales-api/SalesController";
import {SalesRecorder} from "../sales-api/SalesRecorder";
import {ObjectID} from "bson";
import {Sale} from "./model/Sale";

export class SalesController implements SalesControllerAPI {

    constructor(private salesRecorder: SalesRecorder) {}

    failedTransaction(): boolean {
        return false;
    }

    startTransaction(creditCardNumber: string,
                     price: number,
                     productId: string,
                     storageId: ObjectID,
                     username: string,
                     onSuccess?: (response: any) => void,
                     onError?: (error: any) => void): void {

        if (creditCardNumber.length === 16) {
            this.salesRecorder.recordSale(new Sale({date: new Date(), price: price, product: productId, storage: storageId, username: username }));
            onSuccess(true)
        } else {
            onError("Card not valid")
        }
    }

    transactionSuccess(): boolean {
        return false;
    }



}