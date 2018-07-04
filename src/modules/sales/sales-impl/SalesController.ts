import {SalesController as SalesControllerAPI} from "../sales-api/SalesController";
import {SalesRecorder} from "../sales-api/SalesRecorder";

export class SalesController implements SalesControllerAPI {

    constructor(private salesRecorder: SalesRecorder) {}

    failedTransaction(): boolean {
        return false;
    }

    startTransaction(creditCardId: string, price: number, onSuccess?: (response: any) => void, onError?: (error: any) => void): void {
        if(creditCardId.length === 10) {
            onSuccess(true);
        } else {
            onError(true);
        }
    }

    transactionSuccess(): boolean {
        return false;
    }

}