import {Response} from 'express'
import mongoose from "mongoose";
import {Category as CategoryAPI} from "../../category-api/model/Category";
import {ComposedCategory} from "../model/ComposedCategory";
import {Category} from "../model/Category";

export class CategoryRepository {

    private static _instance: CategoryRepository = new CategoryRepository();

    constructor() {
        if(!CategoryRepository._instance) {
            CategoryRepository._instance = this;
        }
    }

    public static getInstance(): CategoryRepository {
        return this._instance;
    }

    public addCategory(category: CategoryAPI, callback: (error: any, response: any) => Response|void) {
        const categoryDocument = this.getCategoryInstance(category);
        if (categoryDocument) {
            return categoryDocument.save(callback)
        }
    }

    private getCategoryInstance(category: CategoryAPI) {
        if (category instanceof ComposedCategory) {
            return new NewCategorySchema({
                categories: category.categories,
                name: category.name
            })
        } else if (category instanceof Category) {
            return new NewCategorySchema({
                name: category.name
            })
        } else {
            return undefined
        }
    }
}

const newCategorySchema = new mongoose.Schema({
    categories: [mongoose.Schema.Types.Mixed],
    /* Todo, ver bien si podría ser el id de la categoría, debería pasarle un nombre de categoría y si existe,
     no hacer nada y si no crearlo y asignarlo */
    name: String
});

/*const editCategorySchema = new mongoose.Schema({
    categories: [mongoose.Schema.Types.Mixed],
    _id: mongoose.Schema.Types.ObjectId,
    name: String
});*/
const NewCategorySchema = mongoose.model("Category", newCategorySchema);
// const EditCategorySchema = mongoose.model("Category", editCategorySchema);
