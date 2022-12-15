import db from '../models/connection';
import ProductsModel from '../models/products.model';
import Product from '../types/product';

class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(db);
  }

  public getAll = async (): Promise<Product[]> => {
    const products = await this.model.getAll();
    return products;
  };
}

export default ProductsService;