import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import checkOrderData from '../middlewares/order';
import validateToken from '../middlewares/token';

const orderRouter = Router();

const controller = new OrdersController();

orderRouter.get('/orders', controller.getAll);

orderRouter.post('/orders', validateToken, checkOrderData, controller.add);

export default orderRouter;
