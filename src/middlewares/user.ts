import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationResult } from 'joi';
import codes from '../models/statusCodes';
import User from '../types/user';

const userSchema = Joi.object({
  username: Joi.string().required().min(3),
  vocation: Joi.string().required().min(3),
  level: Joi.number().required().min(1),
  password: Joi.string().required().min(8),
});

const checkUserData = async (req: Request<User>, res: Response, next: NextFunction) => {
  const { error } = <ValidationResult>userSchema.validate(req.body);
  if (error) {
    const { message, type } = error.details[0];
    if (type === 'any.required') {
      return res.status(codes.BAD_REQUEST).json({ message, type });
    }
    return res.status(codes.UNPROCESSABLE_ENTITY).json({ message, type });
  }
  next();
};

export default checkUserData;
