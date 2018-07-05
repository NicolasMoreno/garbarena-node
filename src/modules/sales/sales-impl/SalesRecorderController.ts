import {SalesRecorder} from "../sales-api/SalesRecorder";
import {Sale} from "../sales-api/model/Sale";
import mongoose from "mongoose";
import {ObjectID} from "bson";

export class SalesRecorderController implements SalesRecorder {
    
    getSalesByUsername(username: string): Sale[] {
        return undefined;
    }

    recordSale(sale: Sale): void {
        const saleDoc = new SaleSchema(sale);
        saleDoc.save()
    }

}

const saleSchema = new mongoose.Schema({
    userName: String,
    date: Date,
    price: Number,
    product: String,
    storage: mongoose.Schema.Types.ObjectId
});

const SaleSchema = mongoose.model('Sale', saleSchema);