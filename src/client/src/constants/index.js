export const API_BASE_URL = 'http://192.168.200.1:8080';
export const API_BASE_OAUTH2_URL = 'http://192.168.200.1:8000';
// export const API_BASE_URL = 'http://localhost:8080';
// export const API_BASE_OAUTH2_URL = 'http://localhost:8000';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_OAUTH2_URL + '/auth/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_OAUTH2_URL + '/auth/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_OAUTH2_URL + '/auth/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const ROUTER_MAP = {
    'ROLE_ADMIN': '/admin',
    'ROLE_STAFF': '/staff',
    'ROLE_LEAD': '/lead',
    'ROLE_HR': '/hr'
}

export const PATH_MAP = {
    '/admin': 'ROLE_ADMIN',
    '/staff': 'ROLE_STAFF',
    '/lead': 'ROLE_LEAD',
    '/hr': 'ROLE_HR' 
}