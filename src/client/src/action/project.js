import {
    request
} from './';

const url = '/api/projects';
const superUrl = '/api/admin/projects';

export const UPDATE_PROJECT_ID = 'UPDATE_PROJECT_ID';

export function updateProjectItem(projectItem) {
    return {
        type: UPDATE_PROJECT_ID,
        projectItem
    };
}

export function create(createRequest) {
    return request({
        url: url + "/",
        method: 'POST',
        data: JSON.stringify(createRequest)
    });
}

export function getProjects(employeeId) {
    return request({
        url: url + "/" + employeeId + "/all",
        method: 'GET',
    });
}

export function getEmployeeFree(projectId) {
    return request({
        url: url + "/" + projectId + "/employees",
        method: 'GET',
    });
}

export function getAllProjects() {
    return request({
        url: superUrl + "/",
        method: 'GET',
    });
}