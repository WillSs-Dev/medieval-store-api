import { Request, Response } from 'express';
import codes from '../models/statusCodes';
import UserService from '../services/users.service';
import User from '../types/user';

class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public add = async (req: Request<User>, res: Response) => {
    const token = await this.service.add(req.body);
    return res.status(codes.CREATED).json({ token });
  };
}

export default UserController;