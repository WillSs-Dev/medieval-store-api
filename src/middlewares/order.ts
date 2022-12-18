import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationError, ValidationResult } from 'joi';
import codes from '../models/statusCodes';
import OrderRequest from '../types/orderRequest';

const productsIdsSchema = Joi.object({
  productsIds: Joi.array().items(Joi.number().required()).required(),
  userId: Joi.number().required(),
});

const returnError = (req: Request<OrderRequest>, res: Response, error: ValidationError) => {
  const { type, message } = error.details[0];
  if (type === 'any.required') {
    return res.status(codes.BAD_REQUEST).json({ message });
  }
  if (type === 'number.base' || !req.body.productsIds.length) {
    return res
      .status(codes.UNPROCESSABLE_ENTITY)
      .json({ message: '"productsIds" must include only numbers' });
  }
  return res.status(codes.UNPROCESSABLE_ENTITY).json({ message });
};

const checkOrderData = (
  req: Request<OrderRequest>,
  res: Response,
  next: NextFunction,
) => {
  const { error } = <ValidationResult>(
    productsIdsSchema.validate(req.body, { convert: false })
  );
  if (error) {
    return returnError(req, res, error);
  }
  next();
};

export default checkOrderData;
