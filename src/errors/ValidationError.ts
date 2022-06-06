import ErrorCode from './ErrorCode';
import ErrorInterface from '../interfaces/ErrorInterface';

export default class ValidationError implements ErrorInterface {
  message: string;
  readonly code = 400;
  readonly errorCode = ErrorCode.VALIDATION_ERROR;

  constructor(message: string) {
    this.message = message;
  }
}
