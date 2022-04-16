import axios from 'axios';
import { getCookie } from '../utils/useCookie';
import { userAccessToken } from '../contants';

export let host = null;
export const token = getCookie(userAccessToken);

if (process.env.NODE_ENV === 'production') {
    // host = 'http://195.158.24.249:2020';
     host = 'https://reqres.in';

    // host = '/';
} else {
    // host = 'http://195.158.24.249:2020';
    host = 'https://reqres.in';
}

export let axiosAuthenticatedInstance = axios.create({
    baseURL: `${host}`,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json"
    }
})