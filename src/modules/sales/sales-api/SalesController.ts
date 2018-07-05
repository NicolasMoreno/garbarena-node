
import {ObjectID} from "bson";

export interface SalesController {

    startTransaction(creditCardNumber: string,
                     price: number,
                     productId: string,
                     storageId: ObjectID,
                     username: string,
                     onSuccess?: (response: any) => void,
                     onError?: (error: any) => void): void

    transactionSuccess(): boolean
    failedTransaction(): boolean
}