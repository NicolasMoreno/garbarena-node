import {ObjectID} from "bson";
import {Type} from "./Type";

export interface Saleable {
    id: ObjectID;
    price: number;
    categoryId: ObjectID;
    name: string;
    productType: Type;
}