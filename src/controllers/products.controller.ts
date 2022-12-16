import { Request, Response } from 'express';
import codes from '../models/statusCodes';
import ProductsService from '../services/products.service';
import Product from '../types/product';

class ProductsController {
  private service: ProductsService;

  constructor() {
    this.service = new ProductsService();
  }

  public getAll = async (__req: Request, res: Response) => {
    const products = await this.service.getAll();
    return res.status(codes.OK).json(products);
  };

  public add = async (req: Request<Product>, res: Response) => {
    const newProduct = await this.service.add(req.body);
    return res.status(codes.CREATED).json(newProduct);
  };
}

export default ProductsController;
