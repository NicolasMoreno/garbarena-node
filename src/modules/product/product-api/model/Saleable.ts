import {ObjectID} from "bson";

export interface Saleable {
    id: ObjectID;
    price: number;
    setPrice(price: number): void
    categoryId: ObjectID;
    name: string;
}