import { Request, Response } from 'express';
import OrdersService from '../services/orders.service';

class OrdersController {
  private service: OrdersService;

  constructor() {
    this.service = new OrdersService();
  }

  public getAll = async (__req: Request, res: Response) => {
    const orders = await this.service.getAll();
    return res.status(200).json(orders);
  };
}

export default OrdersController;
