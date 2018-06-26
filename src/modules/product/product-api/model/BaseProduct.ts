import {Type} from './Type'
import {Saleable} from './Saleable'
export interface BaseProduct extends Saleable{
    setProductType(type: Type): void
    setPrice(price: number): void

}