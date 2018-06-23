import mongoose from "mongoose";
import TypeSchema from "./Type";


const saleableSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    categoryId: mongoose.Schema.Types.ObjectId,
    productType: {type: TypeSchema, required: true},
    products: [mongoose.Schema.Types.Mixed],
});

const SaleableSchema = mongoose.model("Saleable", saleableSchema);
export default SaleableSchema