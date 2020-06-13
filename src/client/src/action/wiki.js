import {
    request
} from '.';

const url = '/api/wiki';

export const WIKI_STATE = [
    'ACTIVE', 'INACTIVE'
]

/* 
{
    "title":"test2",
    "content":"Child of 15920278852171",
    "createdUser":"1",
    "path":"/15920278852171",
    "projectId":"1"
}
*/
export function create(createRequest) {
    return request({
        url: url + "/",
        method: 'POST',
        data: JSON.stringify(createRequest)
    });
}

export function getWikiById(wikiId) {
    return request({
        url: url + "/" + "?" + "id=" + wikiId,
        method: 'GET',
    });
}

export function getWikiByPath(path) {
    return request({
        url: url + "/" + "?" + "path=" + path,
        method: 'GET',
    });
}

export function getWikiByProject(projectId) {
    return request({
        url: url + "/" + "?" + "projectId=" + projectId,
        method: 'GET',
    });
}