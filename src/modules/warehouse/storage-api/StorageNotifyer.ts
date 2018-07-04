import {ObjectID} from "bson";

export interface StorageNotifyer {
    notifySoldProduct(storageId: ObjectID, saleableId: string, amount: number, isDelivery: boolean,
                      callback: (error: any, response: any) => any,
                      onError: (errorMessage: string) => any): void
}