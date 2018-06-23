import {Type as TypeAPI} from '../../product-api/model/Type'
import mongoose from "mongoose"

export class Type implements TypeAPI{
    value: string;
    constructor(type: any) {
        this.value = type.value;
    }
}

const typeSchema = new mongoose.Schema({
    value: String
});

const TypeSchema = mongoose.model('Type', typeSchema);
export default TypeSchema
