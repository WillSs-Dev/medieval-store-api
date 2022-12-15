import db from '../models/connection';
import OrdersModel from '../models/orders.model';
import Order from '../types/order';

class OrdersService {
  private model: OrdersModel;

  constructor() {
    this.model = new OrdersModel(db);
  }

  public getAll = async (): Promise<Order[]> => {
    const orders = await this.model.getAll();
    return orders;
  };
}

export default OrdersService;