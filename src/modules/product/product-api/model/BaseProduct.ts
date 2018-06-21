import {Type} from './Type'
import {Saleable} from './Saleable'
export interface BaseProduct extends Saleable{
    productType: Type
    setProductType(type: Type): void
}