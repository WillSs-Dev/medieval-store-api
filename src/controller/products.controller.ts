import { Request, Response } from 'express';
import ProductsService from '../services/products.services';

class ProductsController {
  private service: ProductsService;

  constructor() {
    this.service = new ProductsService();
  }

  public getAll = async (__req: Request, res: Response) => {
    const products = await this.service.getAll();
    return res.status(200).json(products);
  };
}

export default ProductsController;
