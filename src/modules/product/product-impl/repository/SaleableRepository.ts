import {Saleable} from "../../product-api/model/Saleable";
import mongoose from "mongoose";
import {ComposedProduct} from "../model/ComposedProduct";
import {BaseProduct} from "../model/BaseProduct";
import { Request, Response, NextFunction } from "express";


export class SaleableRepository {

    public addProduct(saleable: Saleable, callback: (error : any, response: any) => Response|void ) {
        const saleableDocument = this.getSaleableInstance(saleable);
        if(saleableDocument) {
            return saleableDocument.save(callback)
        }
    }

    private getSaleableInstance(saleable: Saleable)  {
        if (saleable instanceof ComposedProduct) {
            return new NewSaleableSchema({
                name: saleable.name,
                price: saleable.price,
                categoryId: saleable.categoryId,
                productType: saleable.productType,
                products: saleable.products,
            })
        } else
        if (saleable instanceof BaseProduct) {
            return new NewSaleableSchema({
                name: saleable.name,
                price: saleable.price,
                categoryId: saleable.categoryId,
                productType: saleable.productType,
            })
        } else {
            return undefined
        }
    }
}

const saleableSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    categoryId: mongoose.Schema.Types.ObjectId,
    productType: mongoose.Schema.Types.Mixed,
    products: [mongoose.Schema.Types.Mixed], // TODO ME MOLESTA EL ARRAY DE PRODUCTS EN UN PRODUCTO BASE
});

const NewSaleableSchema = mongoose.model("Saleable", saleableSchema);
