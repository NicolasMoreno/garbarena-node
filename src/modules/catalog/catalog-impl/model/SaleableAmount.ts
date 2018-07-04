import {SaleableAmount as SaleableAmountAPI} from "../../catalog-api/model/SaleableAmount";
import {Saleable} from "../../../product/product-api/model/Saleable";
import {Stock} from "../../../warehouse/stock-api/model/Stock";
import {StorageNotifyer} from "../../../warehouse/storage-api/StorageNotifyer";

export class SaleableAmount implements SaleableAmountAPI {

    product: Saleable;
    stock: Stock;

    constructor( product?: any, stock?: any) {
        this.product = product;
        this.stock = stock;
    }
}