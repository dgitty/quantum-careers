export class NetworkError extends Error {
    constructor(url: string, reason: any) {
        super(`Network Error - Failed to make a request to ${url}. Reason: ${reason}`);
    }
}