import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationResult } from 'joi';
import codes from '../models/statusCodes';
import Product from '../types/product';

const productSchema = Joi.object({
  name: Joi.string().required().min(3),
  amount: Joi.string().required().min(3),
});

const checkProductData = async (req: Request<Product>, res: Response, next: NextFunction) => {
  const { error } = <ValidationResult>productSchema.validate(req.body);
  if (error) {
    const { message, type } = error.details[0];
    if (type === 'string.min' || type === 'string.base') {
      return res.status(codes.UNPROCESSABLE_ENTITY).json({ message });
    }
    return res.status(codes.BAD_REQUEST).json({ message });
  }
  next();
};

export default checkProductData;
