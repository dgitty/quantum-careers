import { HttpStatus, ValidationErrors } from "../model";

export class HttpError extends Error {
    constructor(public readonly code: HttpStatus, public readonly message: string, public readonly body?: any | ValidationErrors) {
        super(message);
    }
}