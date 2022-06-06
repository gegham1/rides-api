import { Request, Response } from 'express';
import logger from '../logger';
import ValidationError from '../errors/ValidationError';
import ErrorMessage from '../errors/ErrorMessage';

export default async (req: Request, res: Response, next: () => void) => {
  const { params } = req;

  if (!parseInt(params?.id)) {
    const error = new ValidationError(ErrorMessage.INVALID_ID_PARAM);

    logger.error({ ...error });
    return res.status(400).send(error);
  }

  next();
};
