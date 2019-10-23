import axios from 'axios';
import {
    API_BASE_URL,
    ACCESS_TOKEN
} from '../constants';

const serverUrl = process.env.SERVER_HOST || 'http://localhost:8080';
const api = axios.create({
    baseURL: serverUrl
});

export const request = (options) => {
    let headers = {
        'Content-Type': 'application/json',
    };
    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers = {
            ...headers,
            'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        };
    }

    const defaults = {
        headers: headers
    };
    console.log(defaults);
    options = Object.assign({}, defaults, options);
    return api(options)
        .then(response => {
            console.log(response);
            if (response.status !== 200) {
                return Promise.reject(response);
            }
            return response.data;
        });
};