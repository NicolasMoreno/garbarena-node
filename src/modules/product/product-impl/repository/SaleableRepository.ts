import {Saleable} from "../../product-api/model/Saleable";
import mongoose from "mongoose";
import {ComposedProduct} from "../model/ComposedProduct";
import {BaseProduct} from "../model/BaseProduct";
import { Response} from "express";
import {ObjectID} from "bson";
import {ComposedProductSchema} from "../model/ComposedProductSchema";


export class SaleableRepository {

    private static _instance: SaleableRepository = new SaleableRepository();

    constructor() {
        if(!SaleableRepository._instance) {
            SaleableRepository._instance = this;
        }
    }

    public static getInstance(): SaleableRepository {
        return this._instance;
    }

    public addProduct(saleable: Saleable, callback: (error : any, response: any) => Response|void, error?: (message: string) => Response ) {
        this.getSaleableInstance(saleable).then(
            (saleableDocument) => {
                return saleableDocument.save(callback)
            }
        );

    }

    public getProductById(saleableId: ObjectID, callback: (error: any, elemFound: any) => Response) {
        NewSaleableSchema.findById( saleableId, callback)
    }

    public updateProduct(saleable: Saleable, callback: (error: any, response: any) => Response,
                         notFoundCallback?: (message: string) => Response) {
        this.getProductById(saleable.id(), (errorFound, saleableFound) => {
            if (errorFound) return notFoundCallback("Error updating product");
            if (saleableFound) {
                saleableFound.update(saleable, callback)
            } else {
                notFoundCallback("Product not found")
            }
        })
    }

    public getAllProducts(callback: (error: any, response: any) => Response) {
        return NewSaleableSchema.find({}, callback)
    }

    private getProductByArrayId(saleablesId: ObjectID[]): Promise<any> {
        return Promise.all(
            saleablesId.map(id => NewSaleableSchema.findById(id, (err, result) => err ? err : result ))
        )
    }

    private getSaleableInstance(saleable: Saleable): Promise<any>  {
        return new Promise( ((resolve, reject) => {
            if (saleable instanceof ComposedProduct) {
                const auxSaleable = new ComposedProduct(saleable);
                this.buildComposition(auxSaleable).then(() => {
                    auxSaleable.setPrice();
                    resolve(new NewSaleableSchema({
                        name: auxSaleable.name,
                        price: auxSaleable.price,
                        categoryId: auxSaleable.categoryId,
                        productType: auxSaleable.productType,
                        discountFactor: auxSaleable.discountFactor,
                        products: auxSaleable.productsObjectList
                    }))
                });
            } else
            if (saleable instanceof BaseProduct) {
                resolve(new NewSaleableSchema({
                    name: saleable.name,
                    price: saleable.price,
                    categoryId: saleable.categoryId,
                    productType: saleable.productType,
                }))
            } else {
                reject("Error Instance");
            }
        }));
    }

    private buildComposition(auxSaleable: ComposedProduct): Promise<any> {
        return new Promise<ComposedProduct>( (resolve, reject) => {
            this.getProductByArrayId(auxSaleable.products).then(
            (result) => {
                result.map((item: any) => {
                    item._doc.productType.value === 'Combo' ?
                        auxSaleable.addProductObject(new ComposedProductSchema(item._doc)):
                        auxSaleable.addProductObject(new BaseProduct(item._doc))
                });
                resolve();
            });
        })
    }
}

const saleableSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, required: true},
    discountFactor: {type: Number, required: false},
    productType: mongoose.Schema.Types.Mixed,
    products: {type: [mongoose.Schema.Types.Mixed], required: () => saleableSchema.get('productType') === 'Combo'}, // TODO ME MOLESTA EL ARRAY DE PRODUCTS EN UN PRODUCTO BASE
});

export const NewSaleableSchema = mongoose.model("Saleable", saleableSchema);
