import {Sale as SaleAPI} from "../../sales-api/model/Sale";
import {Saleable} from "../../../product/product-api/model/Saleable";

export class Sale implements SaleAPI{

    date: Date;
    price: number;
    product: Saleable;
    storage: Storage;
    userName: string;

    constructor( sale: any ) {
        this.date = sale.date;
        this.price = sale.price;
        this.product = sale.product;
        this.storage = sale.storage;
        this.userName = sale.username;
    }

}