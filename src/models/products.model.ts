import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../types/product';

class ProductsModel {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  public async getAll(): Promise<Product[]> {
    const query = 'SELECT * FROM Trybesmith.products;';
    const [rows] = await this.db.execute(query);
    return rows as Product[];
  }

  public async add(product: Product): Promise<Product> {
    const query = `INSERT INTO Trybesmith.products(name, amount, order_id)
  VALUES(?, ?, NULL)`;
    const [{ insertId }] = await this.db.execute<ResultSetHeader>(query, [
      product.name,
      product.amount,
    ]);
    return { id: insertId, ...product };
  }
}

export default ProductsModel;
