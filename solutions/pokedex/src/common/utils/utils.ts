export class Utils {
    /**
     * Create the url parameter string
     * @param variables Dictionary of key value pairs
     * @returns The url parameter string if variables exist otherwise empty string
     */
    public static createUrlParameters(variables: any): string {
        let paramArr: string[] = []
        Object.entries(variables).forEach(([k, v]) => {
            paramArr.push(`${k}=${v}`);
        });
        let paramStr = paramArr.join('&');

        return paramArr.length ? '?' + paramStr : '';
    }
}