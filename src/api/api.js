import { $fetch } from 'ohmyfetch'
import Cookies from 'js-cookie'
import NProgress from "nprogress";


const config =  {
    baseURL: 'http://localhost:8000',
    credentials: 'include',
    headers: {
        Accept: 'application/json',
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
    },
    onRequest(ctx) {
        NProgress.start();
    },
    onResponse(ctx) {
        NProgress.done();
    }
};

const fetchInstance =  $fetch.create(config);

const api = (fetch) => {
    return {
        get: (url, config) => fetch(url, config),
        post: (url, body, config) => fetch(url, { method: 'POST', body: body}),
        patch: (url, body, config) => fetch(url, body, config),
        delete: (url, config) => fetch(url, config),
    }
}

export  default api(fetchInstance)