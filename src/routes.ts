import {SaleableController} from "./modules/product/product-impl/SaleableController";

import {CategoryController} from "./modules/product/category-impl/CategoryController";

const router = require('express').Router();
const saleableController = new SaleableController();
const categoryController = new CategoryController();

// Product
router.get('/api/product/id/:productId', saleableController.getProductById);
router.post('/api/product/add', saleableController.addProduct);
router.put('/api/product/update', saleableController.updateProduct);
router.get('/api/product/all', saleableController.getAllProducts);

// Category
router.post('/api/category/add', categoryController.addCategory);

export default router;
