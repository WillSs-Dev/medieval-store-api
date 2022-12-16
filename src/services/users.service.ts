import jwt from 'jsonwebtoken';
import User from '../types/user';
import UserModel from '../models/users.model';
import db from '../models/connection';
import LoginInfo from '../types/loginInfo';

const OK = 1;
const ERROR = 0;

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

  public login = async (
    userInfo: LoginInfo,
  ): Promise<{ type: number; data?: string }> => {
    const user = await this.model.login(userInfo);
    if (!user) {
      return { type: ERROR };
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      this.secret,
      { expiresIn: '7d' },
    );
    return { type: OK, data: token };
  };
}

export default ProductsService;
