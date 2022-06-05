import ErrorCode from './ErrorCode';

export default class ValidationError {
    message: string;
    errorCode = ErrorCode.VALIDATION_ERROR;

    constructor(message: string) {
        this.message = message;
    }
}
