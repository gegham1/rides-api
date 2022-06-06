import { getMockReq, getMockRes } from '@jest-mock/express';
import validateParamId from './validateParamId';
import logger from '../logger';
import ValidationError from '../errors/ValidationError';
import ErrorMessage from '../errors/ErrorMessage';

jest.mock('../logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
}));

describe('validateParamId tests', () => {
  it('should call next function', () => {
    const mockRequest = getMockReq({
      params: { id: '1' },
    });
    const { res, next } = getMockRes();
    validateParamId(mockRequest, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should call response send with validation error', () => {
    const mockRequest = getMockReq({
      params: { id: 'a' },
    });
    const { res, next } = getMockRes();
    validateParamId(mockRequest, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      new ValidationError(ErrorMessage.INVALID_ID_PARAM),
    );
    expect(logger.error).toHaveBeenCalled();
  });
});
