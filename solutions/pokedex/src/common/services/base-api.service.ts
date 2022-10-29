import { HttpError } from "../errors/http-error";
import { NetworkError } from "../errors/network-error";


const handleError = (url: string, error: any) => {
    if (error instanceof HttpError) {
        throw error;
    }
    throw new NetworkError(url, error);

}

export abstract class BaseApiService {
    protected readonly headers = { 'content-type': 'application/json' };

    protected async get(url: string) {
        try {
            const response = await fetch(url, { method: 'GET', headers: this.headers });
            return await response.json();
        } catch (error) {
            handleError(url, error);
        }
    }
    protected async put(url: string, body: any) {
        try {
            const response = await fetch(url, { body: JSON.stringify(body), headers: this.headers, method: 'PUT' });
            return await response.json();
        } catch (error) {
            handleError(url, error);
        }
    }

    protected async post(url: string, body: any) {
        try {
            const response = await fetch(url, { body: JSON.stringify(body), headers: this.headers, method: 'POST' });
            return await response.json();
        } catch (error) {
            handleError(url, error);
        }
    }

    protected async delete(url: string) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            return await response.json();
        } catch (error) {
            handleError(url, error);
        }
    }

}