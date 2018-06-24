import {Category as CategoryAPI} from "../../category-api/model/Category";
import {ObjectID} from "bson";

export class Category implements CategoryAPI{
    id: ObjectID;
    name: string;

    constructor(category: any) {
        this.id = category.id;
        this.name = category.name;
    }

    setName(name: string): string {
        return this.name = name;
    }

}