import { Pool } from 'mysql2/promise';
import Order from '../types/order';

class OrdersModel {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  public async getAll(): Promise<Order[]> {
    const query = `SELECT O.id as id, user_id as userId, JSON_ARRAYAGG(P.id) as productsIds
    FROM Trybesmith.orders as O
    INNER JOIN Trybesmith.products as P
    WHERE P.order_id = O.id
    GROUP BY O.id, user_id;`;
    const [rows] = await this.db.execute(query);
    return rows as Order[];
  }
}

export default OrdersModel;
