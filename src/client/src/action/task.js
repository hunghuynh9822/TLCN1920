import {
    request
} from '.';

const url = '/api/tasks';
const superUrl = '/api/admin/tasks';
const superUrl = '/api/lead/tasks';
/* 
{
    projectId:
    employeeCreator:
    employeeAssignee:
    title:
    description:
    startedAt:
    duration:
}
*/
export function create(createRequest) {
    return request({
        url: url + "/",
        method: 'POST',
        data: JSON.stringify(createRequest)
    });
}

export function getTasksByEmployee(project, employee) {
    return request({
        url: url + "/" + "?" + "project=" + project + "&" + "employee=" + employee,
        method: 'GET',
    });
}


export function updateStateTasks(updateRequest) {
    return request({
        url: url + "/update-state",
        method: 'PATCH',
        data: JSON.stringify(createRequest)
    });
}

/*
{
    taskId:
    employeeId:
    title:
    description:
    point:
    state:
    startedAt:
    duration:
}
*/
export function updateTasks(updateRequest) {
    return request({
        url: url + "/update",
        method: 'PUT',
        data: JSON.stringify(createRequest)
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