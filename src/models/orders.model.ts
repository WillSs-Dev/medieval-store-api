import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../types/order';
import OrderRequest from '../types/orderRequest';

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

  public add = async (orderRequest: OrderRequest) => {
    let query = 'INSERT INTO Trybesmith.orders(user_id) VALUE(?)';

    const [{ insertId }] = await this.db.execute<ResultSetHeader>(query, [orderRequest.userId]);

    query = `UPDATE Trybesmith.products
    SET order_id = ?
    WHERE id = ?`;

    const { productsIds } = orderRequest;
    const mappedPromisses = productsIds.map((id) => this.db.execute(query, [insertId, id]));
    const resolved = await Promise.all(mappedPromisses);
    return resolved;
  };
}

export default OrdersModel;
