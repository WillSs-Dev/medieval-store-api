import { NextFunction, Request, Response } from 'express';
import codes from '../models/statusCodes';
import LoginInfo from '../types/loginInfo';

const checkLoginData = async (req: Request<LoginInfo>, res: Response, next: NextFunction) => {
  const { body: loginInfo } = req;
  if (!loginInfo.username) {
    return res.status(codes.BAD_REQUEST).json({ message: '"username" is required' });
  }
  if (!loginInfo.password) {
    return res.status(codes.BAD_REQUEST).json({ message: '"password" is required' });
  }
  next();
};

export default checkLoginData;
