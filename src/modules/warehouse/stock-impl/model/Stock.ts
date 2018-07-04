import {Stock as StockAPI} from "../../stock-api/model/Stock";

export class Stock implements StockAPI {
    amount: number;
    storageId: string;

    constructor(stock: any) {
        this.amount = stock.amount;
        this.storageId = stock.storageId;
    }

}