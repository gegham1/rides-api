import ErrorCode from './ErrorCode';

export default class ServerError {
  message: string;
  errorCode = ErrorCode.SERVER_ERROR;

  constructor(message: string) {
    this.message = message;
  }
}
