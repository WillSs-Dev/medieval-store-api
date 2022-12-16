import db from '../models/connection';
import ProductsModel from '../models/products.model';
import Product from '../types/product';

class ProductsService {
  private model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(db);
  }

  public getAll = async (): Promise<Product[]> => {
    const products = await this.model.getAll();
    return products;
  };

  public add = async (product: Product): Promise<Product> => {
    const newProduct = await this.model.add(product);
    return newProduct;
  };
}

export default ProductsService;