import {ComposedProduct as ComposedProductAPI} from '../../product-api/model/ComposedProduct'
import {ObjectID} from "bson";
import {Saleable} from '../../product-api/model/Saleable'
import {Type} from "./Type";
import {ComposedProductSchema} from "./ComposedProductSchema";


export class ComposedProduct implements ComposedProductAPI {
    categoryId: ObjectID;
    name: string;
    price: number;
    products: ObjectID[];
    productType: Type;
    discountFactor: number;

    private _id: ObjectID;

    private _productsObjectList: Saleable[] = [];

    constructor(baseProduct: any) {
        this.categoryId = baseProduct.categoryId;
        this._id = baseProduct._id;
        this.name = baseProduct.name;
        this.discountFactor = baseProduct.discountFactor ? baseProduct.discountFactor : 0;
        this.products = baseProduct.products;
        this.productType = new Type( {value: 'Combo'})
    }

    addProduct(saleable: ObjectID): ObjectID[] {
        this.products.push(saleable);
        return this.products;
    }

    removeProduct(saleable: ObjectID): ObjectID[] {
        this.products = this.products.filter(product => !product.equals(saleable));
        return this.products
    }

    setPrice(): void {
        this.price = 0;
        this._productsObjectList.forEach( product => {
            if (product instanceof ComposedProductSchema) {
                product.setPrice();
                this.price += product.price;
            } else {
                this.price += product.price
            }
        });
        if(this.discountFactor !== 0) this.price = (this.price * (1 - (this.discountFactor / 100)));
    }

    addProductObject(saleable: Saleable) {
        this._productsObjectList.push(saleable);
    }

    get productsObjectList() {
        return this._productsObjectList
    }

    id(): ObjectID {
        return this._id
    }

}

/*
const composedProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    categoryId: mongoose.Schema.Types.ObjectId,
    productType: {type: TypeSchema, required: true},
    products: {type: [mongoose.Schema.Types.Mixed], required: true}
});

const ComposedProductSchema = mongoose.model("ComposedProduct", composedProductSchema);
export default ComposedProductSchema*/
