import ErrorCode from './ErrorCode';
import ErrorInterface from '../interfaces/ErrorInterface';

export default class NotFoundError implements ErrorInterface {
  message: string;
  readonly code = 404;
  readonly errorCode = ErrorCode.RIDES_NOT_FOUND_ERROR;

  constructor(message: string) {
    this.message = message;
  }
}
