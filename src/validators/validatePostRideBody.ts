import { Request, Response } from 'express';
import { validate } from 'class-validator';
import RideDTO from '../dto/RideDTO';
import logger from '../logger';
import ValidationError from '../errors/ValidationError';

export default async (req: Request, res: Response, next: () => void) => {
  const { body } = req;
  const ride = new RideDTO(body);

  const errors = await validate(ride);

  if (errors.length === 0) {
    next();
    return;
  }

  const [firstError] = errors;
  let message;

  if (firstError.constraints) {
    message = Object.values(firstError.constraints)[0];
  } else {
    message = `invalid ${firstError.property}`;
  }

  const error = new ValidationError(message);

  logger.error({ ...error });
  return res.status(400).send(error);
};
