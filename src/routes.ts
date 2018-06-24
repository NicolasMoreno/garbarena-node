import {SaleableController} from "./modules/product/product-impl/SaleableController";
import {SaleableRepository} from "./modules/product/product-impl/repository/SaleableRepository";

import {CategoryController} from "./modules/product/category-impl/CategoryController";
import {CategoryRepository} from "./modules/product/category-impl/repository/CategoryRepository";

const router = require('express').Router();
const saleableController = new SaleableController(new SaleableRepository());
const categoryController = new CategoryController(new CategoryRepository());

// Product
router.post('/api/product/add', saleableController.addProduct);

// Category
router.post('/api/category/add', categoryController.addCategory);

export default router;
