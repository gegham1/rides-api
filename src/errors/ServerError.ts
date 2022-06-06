import ErrorCode from './ErrorCode';
import ErrorInterface from '../interfaces/ErrorInterface';

export default class ServerError implements ErrorInterface {
  message: string;
  readonly code = 500;
  readonly errorCode = ErrorCode.SERVER_ERROR;

  constructor(message: string) {
    this.message = message;
  }
}
