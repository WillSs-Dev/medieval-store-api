import { Pool } from 'mysql2/promise';
import Product from '../types/product';
// import dbd from './connection';

class ProductsModel {
  public db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  public async getAll(): Promise<Product[]> {
    const query = 'SELECT * FROM Trybesmith.products;';
    const [rows] = await this.db.execute(query);
    // console.log(rows);
    return rows as Product[];
  }
}

// const model = new ProductsModel(dbd);
// model.getAll();

export default ProductsModel;
