import { HttpError } from "../errors/http-error";
import { NetworkError } from "../errors/network-error";

/**
 * Handles error by throwing http error or throwing network error.
 * @param url The url path
 * @param error The error
 */
const handleError = (url: string, error: any) => {
    if (error instanceof HttpError) {
        throw error;
    }
    throw new NetworkError(url, error);

}

/**
 * BaseAPISerivce provides an interface to corresponding backend API and should be extended by any Service class.
 */
export abstract class BaseApiService {
    protected readonly headers = { 'content-type': 'application/json' };

    /**
     * Get function initiates get request
     * @param url The url path
     * @returns The json response
     */
    protected async get(url: string) {
        try {
            const response = await fetch(url, { method: 'GET', headers: this.headers });
            return await response.json();
        } catch (error) {
            handleError(url, error);
        }
    }

    /**
     * Put function initiates put request
     * @param url The url path
     * @param body The payload body that contains the information
     * @returns The json response
     */
    protected async put(url: string, body: any) {
        try {
            const response = await fetch(url, { body: JSON.stringify(body), headers: this.headers, method: 'PUT' });
            return await response.json();
        } catch (error) {
            handleError(url, error);
        }
    }

    /**
     * Post function initiates post request
     * @param url The url path
     * @param body The payload body that contains the information
     * @returns The json response
     */
    protected async post(url: string, body: any) {
        try {
            const response = await fetch(url, { body: JSON.stringify(body), headers: this.headers, method: 'POST' });
            return await response.json();
        } catch (error) {
            handleError(url, error);
        }
    }

    /**
     * Delete function initiates delete request
     * @param url The url path
     * @returns The json response
     */
    protected async delete(url: string) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            return await response.json();
        } catch (error) {
            handleError(url, error);
        }
    }

}