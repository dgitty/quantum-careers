/**
 * NetworkError provides network error details
 *  @extends Error
 */
export class NetworkError extends Error {
    constructor(url: string, error: any) {
        super(`Network Error - Failed to make a request to ${url}. Error Details: ${error}`);
    }
}