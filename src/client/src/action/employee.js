import {
    request
} from './'

const url = '/emplmicro/api/employees';
const superUrl = '/emplmicro/api/admin/employees'

export function create(createRequest) {
    return request({
        url: url + "/",
        method: 'POST',
        data: JSON.stringify(createRequest)
    });
}

export function getEmployees() {
    return request({
        url: url + "/",
        method: 'GET',
    });
}

export function getAdminEmployees() {
    return request({
        url: superUrl + "/",
        method: 'GET',
    });
}

export function getRoles() {
    return request({
        url: superUrl + "/roles",
        method: 'GET',
    });
}

export function updateState(requestUpdate) {
    return request({
        url: superUrl + "/state",
        method: 'PATCH',
        data: JSON.stringify(requestUpdate)
    });
}