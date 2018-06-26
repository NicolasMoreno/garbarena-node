import {Saleable} from "./Saleable"
import {ObjectID} from "bson";

export interface ComposedProduct extends Saleable{
    products: ObjectID[]
    addProduct(saleableId: ObjectID): ObjectID[]
    removeProduct(saleable: ObjectID): ObjectID[]
    setPrice(): void
}