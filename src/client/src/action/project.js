import {
    request
} from './';

const url = '/api/projects';
const superUrl = '/api/admin/projects';

export const UPDATE_PROJECT_ID = 'UPDATE_PROJECT_ID';

export const PROJECT_STATE = [
    'NEW', 'DEVELOPING', 'DEVELOPED', 'TESTING', 'TESTED', 'RUNNING', 'MAINTAINING', 'BUG', 'DEBUGGING', 'CLOSE'
]

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

//Get project by admin
export function getAllProjects() {
    return request({
        url: superUrl + "/",
        method: 'GET',
    });
}

export function updateState(projectId, state) {
    return request({
        url: url + "/" + projectId + "/update-state?state=" + state,
        method: 'PATCH',
    });
}

/*
{
    projectId:
    title:
    description:
    state:
}
*/
export function updateProject(updateRequest) {
    return request({
        url: url + "/update",
        method: 'PUT',
        data: JSON.stringify(updateRequest)
    });
}

/*
{
    employeeId:
    projectId:
    role:
}
*/
export function invite(createRequest) {
    return request({
        url: url + "/invite",
        method: 'POST',
        data: JSON.stringify(createRequest)
    });
}

/*
{
    employeeId:
    projectId:
    role:
}
*/
export function remove(deleteRequest) {
    return request({
        url: url + "/remove",
        method: 'DELETE',
        data: JSON.stringify(deleteRequest)
    });
}