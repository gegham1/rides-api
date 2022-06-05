import ErrorCode from './ErrorCode';

export default class NotFoundError {
    message: string;
    errorCode = ErrorCode.RIDES_NOT_FOUND_ERROR;

    constructor(message: string) {
        this.message = message;
    }
}
