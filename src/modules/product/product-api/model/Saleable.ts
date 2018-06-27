import {ObjectID} from "bson";
import {Type} from "./Type";

export interface Saleable {
    price: number;
    categoryId: ObjectID;
    name: string;
    productType: Type;

    id(): ObjectID
}