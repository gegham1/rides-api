import { getMockReq, getMockRes } from '@jest-mock/express';
import validatePostRideBody from './validatePostRideBody';
import logger from '../logger';
import ValidationError from '../errors/ValidationError';
import ErrorMessage from '../errors/ErrorMessage';
import getMockRidePayload from '../../tests/stubs/getMockRidePayload';

jest.mock('../logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
}));

describe('validatePostRideBody tests', () => {
  it('should call next function', async () => {
    const mockRequest = getMockReq({
      body: getMockRidePayload(),
    });
    const { res, next } = getMockRes();
    await validatePostRideBody(mockRequest, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should call response send with validation error', async () => {
    const mockRequest = getMockReq({
      body: {
        ...getMockRidePayload(),
        endLat: 91,
      },
    });
    const { res, next } = getMockRes();
    await validatePostRideBody(mockRequest, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      new ValidationError(ErrorMessage.INVALID_END_LATITUDE_LONGITUDE),
    );
    expect(logger.error).toHaveBeenCalled();
  });
});
