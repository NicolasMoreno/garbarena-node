import {SalesRecorder} from "./SalesRecorder";

export interface SalesController {

    startTransaction(creditCardId: string, price: number, onSuccess?: (response: any) => void, onError?: (error: any) => void): void
    transactionSuccess(): boolean
    failedTransaction(): boolean
}