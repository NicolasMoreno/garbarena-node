import {SalesRecorder} from "../sales-api/SalesRecorder";
import {Sale} from "../sales-api/model/Sale";

export class SalesRecorderController implements SalesRecorder {
    
    getSalesByUsername(username: string): Sale[] {
        return undefined;
    }

    recordSale(sale: Sale): void {
    }

}