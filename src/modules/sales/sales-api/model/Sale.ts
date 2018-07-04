import {ObjectID} from "bson";
import {Saleable} from "../../../product/product-api/model/Saleable";

export interface Sale {
    userName: string
    date: Date
    price: number
    product: Saleable
    storage: Storage
}