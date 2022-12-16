import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';

const orderRouter = Router();

const controller = new OrdersController();

orderRouter.get('/orders', controller.getAll);

export default orderRouter;
