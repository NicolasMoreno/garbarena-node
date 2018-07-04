import {Saleable} from "../../../product/product-api/model/Saleable";
import {Stock} from "../../../warehouse/stock-api/model/Stock";

export interface SaleableAmount {
    product: Saleable
    stock: Stock
}