import {SaleableController} from "./modules/product/product-impl/SaleableController";

import {CategoryController} from "./modules/product/category-impl/CategoryController";
import {StorageController} from "./modules/warehouse/storage-impl/StorageController";

const router = require('express').Router();
const saleableController = new SaleableController();
const categoryController = new CategoryController();
const storageController = new StorageController();

// Product
router.get('/api/product/id/:productId', saleableController.getProductById);
router.post('/api/product/add', saleableController.addProduct);
router.put('/api/product/update', saleableController.updateProduct);
router.get('/api/product/all', saleableController.getAllProducts);
router.get('/api/product/category/:categoryId', categoryController.getProductsByCategory);

// Category
router.post('/api/category/add', categoryController.addCategory);

// Storage
router.get('/api/storage/:storageId', storageController.getStorage);
router.get('/api/storage/product/:productId', storageController.getAmountByProductId);
router.post('/api/storage/add', storageController.addStorage);

export default router;
