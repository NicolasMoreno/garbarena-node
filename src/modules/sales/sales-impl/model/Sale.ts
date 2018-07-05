import {Sale as SaleAPI} from "../../sales-api/model/Sale";
import {ObjectID} from "bson";

export class Sale implements SaleAPI{

    date: Date;
    price: number;
    product: string;
    storage: ObjectID;
    userName: string;

    constructor( sale: any ) {
        this.date = sale.date;
        this.price = sale.price;
        this.product = sale.product;
        this.storage = sale.storage;
        this.userName = sale.username;
    }

}