import {Response} from 'express'
import mongoose from "mongoose";
import {Category as CategoryAPI} from "../../category-api/model/Category";
import {ComposedCategory} from "../model/ComposedCategory";
import {Category} from "../model/Category";

export class CategoryRepository {

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
    name: String
});

/*const editCategorySchema = new mongoose.Schema({
    categories: [mongoose.Schema.Types.Mixed],
    _id: mongoose.Schema.Types.ObjectId,
    name: String
});*/
const NewCategorySchema = mongoose.model("Category", newCategorySchema);
// const EditCategorySchema = mongoose.model("Category", editCategorySchema);
