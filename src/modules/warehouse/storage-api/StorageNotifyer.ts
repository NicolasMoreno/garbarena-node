import {ObjectID} from "bson";

export interface StorageNotifyer {

    notifySoldProduct(storageId: ObjectID, saleableId: string, amount: number, isDelivery: boolean, username: string,
                      callback: (error: any, response: any) => any,
                      onError: (errorMessage: string) => any): void

    checkStock(storageId: ObjectID, saleableId: string, amount: number,
               callback: (hasStock: boolean) => any): void
}