import {ObjectID} from "bson";

export interface Saleable {
    id: string;
    price: number;
    setPrice(price: number): void
    categoryId: ObjectID;
    name: string;
}