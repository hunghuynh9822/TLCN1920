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

