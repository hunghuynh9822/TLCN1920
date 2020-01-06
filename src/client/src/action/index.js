import axios from 'axios';
import {
    ACCESS_TOKEN
} from '../constants';

// export const serverUrl = process.env.SERVER_HOST || 'http://192.168.200.1:8080';
export const serverUrl = 'http://localhost:8080';
const api = axios.create({
    baseURL: serverUrl
});

export const generatePassword = (length) => {
    const data = '9JqVyX2ANTEWIvzOeQhfgwkKsnp5ZotHYUxR7l1jDLcm038PC4FBG6uriMaSdb';
    let result = '';
    if (length > data.length) {
        return data;
    }
    for (let ma = 0; ma < length; ma++) {
        let char = data[Math.floor(Math.random() * data.length)];
        if (result.includes(char)) {
            ma--;
        } else {
            result += char
        }
    }
    console.log(result);
    return result;
}

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
    // console.log("Default header : " + JSON.stringify(defaults));
    options = Object.assign({}, defaults, options);
    console.log("Request : " + JSON.stringify(options));
    return api(options)
        .then(response => {
            console.log("Response from " + options.url);
            console.log(response);
            if (response.status !== 200) {
                return Promise.reject(response);
            }
            return response.data;
        });
};