import {Sale} from "./model/Sale";

export interface SalesRecorder {
    recordSale(sale: Sale): void
    getSalesByUsername(username: string): Sale[]
}