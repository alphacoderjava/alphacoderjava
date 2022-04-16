import { HttpRequestHub } from '../HttpRequestHub';

export const getMainCarousel = () => {
    const config = {
        method: 'GET',
        url: `api/auth/mainsliders`,
    }
    return HttpRequestHub(config);
}

export const getNews = () => {
    const config = {
        method: 'GET',
        url: `/api/users?page=0`,
    }
    return HttpRequestHub(config);
}

export const getSubject = () => {
    const config = {
        method: 'GET',
        url: `api/auth/aboutSciences?page=0&size=5`,
    }
    return HttpRequestHub(config);
}

export const getForTeachers = (page = 0, size = 16) => {
    const config = {
        method: 'GET',
        // url: `api/auth/forTeachers?page=${page}&size=${size}`,
        url: `/api/users?page=${page}`,
    }
    return HttpRequestHub(config);
}

export const getBooks = (page = 0, size = 11) => {
    const config = {
        method: 'GET',
        url: `api/auth/books?page=${page}&size=${size}`,
    }
    return HttpRequestHub(config);
}

export const getBooksById = (id) => {
    const config = {
        method: 'GET',
        url: `api/auth/book/${id}`,
    }
    return HttpRequestHub(config);
}

export const getTextbooks = (page = 0, size = 11) => {
    const config = {
        method: 'GET',
        // url: `/api/auth/textbooks?page=${page}&size=${size}`,
        url: `/api/users?page=${page}`,
    }
    return HttpRequestHub(config);
}

export const getTextbookById = (id) => {
    const config = {
        method: 'GET',
        url: `/api/auth/textbook/${id}`,
    }
    return HttpRequestHub(config);
}

export const getVideos = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/api/users?page=${page}`,
    }
    return HttpRequestHub(config);
}

export const getAudios = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/api/users?page=${page}`,
    }
    return HttpRequestHub(config);
}

export const getForParents = () => {
    const config = {
        method: 'GET',
        url: `/api/users?page=0`,
    }
    return HttpRequestHub(config);
}

export const getQuotes = (page, size) => {
    const config = {
        method: 'GET',
        url: `/api/users?page=${page}&size=${size}`,
    }
    return HttpRequestHub(config);
}