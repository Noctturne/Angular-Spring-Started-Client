import { Category } from "../categories/category";

export class User {
    id!: number;
    username!: string;
    email!: string;
    createAt!: string;
    category!: Category;
}
