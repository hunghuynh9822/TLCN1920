import {
    API_BASE_URL,
    ACCESS_TOKEN
} from '../constants';
import axios from 'axios';

const request = (options) => {
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
    options = Object.assign({}, defaults, options);
    return axios(options)
        .then(response => {
            console.log(response);
            if (response.status !== 200) {
                return Promise.reject(response);
            }
            return response.data;
        });
};

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/auth/current",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        data: JSON.stringify(signupRequest)
    });
}