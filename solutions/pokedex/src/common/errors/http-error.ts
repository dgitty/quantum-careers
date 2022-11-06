import { HttpStatus, ValidationErrors } from '../models';

/**
 * HttpError provides http error details
 * @extends Error
 */
export class HttpError extends Error {
    constructor(public readonly code: HttpStatus, public readonly message: string, public readonly body?: any | ValidationErrors) {
        super(message);
    }
}