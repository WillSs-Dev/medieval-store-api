import { Request, Response } from 'express';
import codes from '../models/statusCodes';
import OrdersService from '../services/orders.service';
import OrderRequest from '../types/orderRequest';

class OrdersController {
  private service: OrdersService;

  constructor() {
    this.service = new OrdersService();
  }

  public getAll = async (__req: Request, res: Response) => {
    const orders = await this.service.getAll();
    return res.status(codes.OK).json(orders);
  };

  public add = async (req:Request<OrderRequest>, res: Response) => {
    await this.service.add(req.body);
    return res.status(codes.CREATED).json(req.body);
  };
}

export default OrdersController;
