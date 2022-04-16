import { axiosAuthenticatedInstance } from './host';

export const HttpRequestHub = (config = null) => {
    return axiosAuthenticatedInstance(config).then((res) => {
        if (config && config.responseType) {
            return res;
        }
        return res;
    }).catch((err) => {
        // If response type other than JSON (ex. arraybuffer)
        if (config && config.responseType) {
            const parsedError = JSON.parse(Buffer.from(err.response.data).toString('utf8'));
            console.log(parsedError);
            return null;
        }

        if (err.response) {
            console.log(err);
        }
        return null;
    })
}