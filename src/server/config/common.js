import { HttpRequestHub } from '../HttpRequestHub';

export const getPageById = (id) => {
    const config = {
        method: 'GET',
        url: `api/auth/page/${id}`,
    }
    return HttpRequestHub(config);
}

export const subscribeUserEmail = (obj) => {
    const config = {
        method: 'POST',
        url: `api/auth/email/save`,
        data: { ...obj },
    }
    return HttpRequestHub(config);
}