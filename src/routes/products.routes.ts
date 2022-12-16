import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const productRouter = Router();

const controller = new ProductsController();

productRouter.get('/products', controller.getAll);

productRouter.post('/products', controller.add);

export default productRouter;
