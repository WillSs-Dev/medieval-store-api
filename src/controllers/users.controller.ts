import { Request, Response } from 'express';
import codes from '../models/statusCodes';
import UserService from '../services/users.service';
import User from '../types/user';
import LoginInfo from '../types/loginInfo';

class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public login = async (req: Request<LoginInfo>, res: Response) => {
    const { type, data } = await this.service.login(req.body);
    if (!type) {
      return res.status(codes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
    }
    return res.status(codes.OK).json({ token: data });
  };

  public add = async (req: Request<User>, res: Response) => {
    const token = await this.service.add(req.body);
    return res.status(codes.CREATED).json({ token });
  };
}

export default UserController;