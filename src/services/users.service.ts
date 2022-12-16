import jwt from 'jsonwebtoken';
import User from '../types/user';
import UserModel from '../models/users.model';
import db from '../models/connection';

class ProductsService {
  private secret: string;

  private model: UserModel;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'secret';
    this.model = new UserModel(db);
  }

  public add = async (user: User): Promise<string> => {
    const token = jwt.sign(user, this.secret, { expiresIn: '7d' });
    await this.model.add(user);
    return token;
  };
}

export default ProductsService;
