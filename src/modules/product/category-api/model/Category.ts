import {ObjectID} from "bson";

export interface Category {
    name: string
    id: ObjectID

    setName(name: string): string
}