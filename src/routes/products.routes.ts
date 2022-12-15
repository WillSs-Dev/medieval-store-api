import { Router } from 'express';
import ProductsController from '../controller/products.controller';

const productRouter = Router();

const controller = new ProductsController();

productRouter.get('/products', controller.getAll);

export default productRouter;
