import {ObjectID} from "bson";

export interface Sale {
    userName: string
    date: Date
    price: number
    product: string
    storage: ObjectID
}