import {Category} from "./Category";

export interface ComposedCategory extends Category{
    categories: Category[]

    addCategory(category: Category): Category[]
    removeCategory(category: Category): Category[]
}