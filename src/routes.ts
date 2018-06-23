import {SaleableController} from "./modules/product/product-impl/SaleableController";
import {SaleableRepository} from "./modules/product/product-impl/repository/SaleableRepository";

const router = require('express').Router();
const saleableController = new SaleableController(new SaleableRepository());

router.post('/api/create-user', saleableController.addProduct);

export default router;
