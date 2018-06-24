import {CategoryController as CategoryControllerAPI} from "../category-api/CategoryController";
import {Request, Response} from "express";
import {CategoryRepository} from "./repository/CategoryRepository";
import {Category as CategoryAPI} from "../category-api/model/Category";
import {ComposedCategory} from "./model/ComposedCategory";
import {Category} from "./model/Category";

export class CategoryController implements CategoryControllerAPI {

    constructor(private categoryRepo: CategoryRepository) {}

    addCategory = (req: Request, res: Response): void => {
        const category: CategoryAPI = this.buildCategoryFromBody(req.body);
        this.categoryRepo.addCategory(category, (err, categoryCallBack) => {
            if(err) {
                return res.status(400).send({
                    status: 400,
                    error: err.message
                });
            }
            return res.send({
                status: 200,
                createdCategory: categoryCallBack
            })
        })
    }

    getProductsByCategory(req: Request, res: Response): void {
    }

    removeCategory(req: Request, res: Response): void {
    }

    private buildCategoryFromBody(body: any): CategoryAPI {
        if (body.categories) {
            return new ComposedCategory(body)
        } else {
            return new Category(body);
        }
    }
}