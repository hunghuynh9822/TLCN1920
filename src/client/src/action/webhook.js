import {
    request
} from '.';

const superUrl = '/api/admin/webhook';

export function create(createRequest) {
    return request({
        url: superUrl + "/create",
        method: 'POST',
        data: JSON.stringify(createRequest)
    });
}

export function update(updateRequest) {
    return request({
        url: superUrl + "/update",
        method: 'PUT',
        data: JSON.stringify(updateRequest)
    });
}

export function deleteWebHook(webHookId) {
    return request({
        url: superUrl + "/delete?id=" + webHookId,
        method: 'DELETE',
    });
}

export function getAllWebHook() {
    return request({
        url: superUrl + "/all",
        method: 'GET',
    });
}