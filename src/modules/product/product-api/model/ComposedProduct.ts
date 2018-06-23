import {Saleable} from "./Saleable"
export interface ComposedProduct extends Saleable{
    products: Saleable[]
    addProduct(saleable: Saleable): Saleable[]
    removeProduct(saleable: Saleable): Saleable[]
}