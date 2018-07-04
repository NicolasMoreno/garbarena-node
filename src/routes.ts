import {SaleableController} from "./modules/product/product-impl/SaleableController";

import {CategoryController} from "./modules/product/category-impl/CategoryController";
import {StorageController} from "./modules/warehouse/storage-impl/StorageController";
import {StockController} from "./modules/warehouse/stock-impl/StockController";

const router = require('express').Router();
const saleableController = new SaleableController();
const categoryController = new CategoryController();
const storageController = new StorageController();
const stockController = new StockController(storageController);

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
router.post('/api/storage/add', storageController.addStorage);

//Stock
router.get('/api/stock/product/:productId', stockController.getStockBySaleableId);
router.get('/api/stock/:productId', stockController.getStockPlacesByProductId)

export default router;
