import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import checkProductData from '../middlewares/products';

const productRouter = Router();

const controller = new ProductsController();

productRouter.get('/products', controller.getAll);

productRouter.post('/products', checkProductData, controller.add);

export default productRouter;
