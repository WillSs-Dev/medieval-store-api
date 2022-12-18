import Jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import OrderRequest from '../types/orderRequest';
import codes from '../models/statusCodes';

const secret = process.env.JWT_SECRET || 'secret';

const validateToken = async (req: Request<OrderRequest>, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(codes.UNAUTHORIZED).json({ message: 'Token not found' });
  }
  try {
    const { userId } = <JwtPayload>Jwt.verify(token as string, secret);
    req.body.userId = userId;
    next();
  } catch (__err) {
    return res.status(codes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export default validateToken;
