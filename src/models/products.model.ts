import { Pool } from 'mysql2/promise';
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
}

export default ProductsModel;
