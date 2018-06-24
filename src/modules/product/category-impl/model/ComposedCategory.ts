import {ComposedCategory as ComposedCategoryAPI} from "../../category-api/model/ComposedCategory";
import {Category} from "../../category-api/model/Category";
import {ObjectID} from "bson";

export class ComposedCategory implements ComposedCategoryAPI {
    categories: Category[];
    id: ObjectID;
    name: string;

    constructor(category: any) {
        this.categories = category.categories;
        this.id = category.id;
        this.name = category.name;
    }

    setName(name: string): string {
        return this.name = name;
    }

    addCategory(category: Category): Category[] {
        this.categories.push(category);
        return this.categories
    }

    removeCategory(category: Category): Category[] {
        this.categories = this.categories.filter(iterCategory => iterCategory.id !== category.id);
        return this.categories
    }



}