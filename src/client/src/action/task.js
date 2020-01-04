import {
    request
} from '.';

const url = '/api/tasks';
const superUrl = '/api/admin/tasks';
const leadUrl = '/api/lead/tasks';

export const TASK_STATE = [
    'NEW', 'DEVELOPING', 'DEVELOPED', 'TESTING', 'DONE', 'FINISH'
]

export const UPDATE_CREATOR_TASKS = 'UPDATE_CREATOR_TASKS';

export function updateCreatorTasks(creatorTasks) {
    return {
        type: UPDATE_CREATOR_TASKS,
        creatorTasks
    };
}

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

export function getTasksByAdmin(project) {
    return request({
        url: superUrl + "/" + "?" + "project=" + project,
        method: 'GET',
    });
}

export function getTasksByEmployee(project, employee) {
    return request({
        url: url + "/" + "?" + "project=" + project + "&" + "employee=" + employee,
        method: 'GET',
    });
}

export function getTasksCreatedByLead(project, employee) {
    return request({
        url: leadUrl + "/" + "?" + "project=" + project + "&" + "employee=" + employee,
        method: 'GET',
    });
}

export function getTasksOfProject(project) {
    return request({
        url: url + "/project" + "?" + "project=" + project,
        method: 'GET',
    });
}

/*
{
    taskId:
    employeeId: assigneeId
}
*/
export function changeAssignee(changeRequest) {
    return request({
        url: leadUrl + "/change-assignee",
        method: 'PATCH',
        data: JSON.stringify(changeRequest)
    });
}

/*
{
    taskId:
    startedAt:
    duration:
}
*/
export function changeTime(changeRequest) {
    return request({
        url: leadUrl + "/change-time",
        method: 'PATCH',
        data: JSON.stringify(changeRequest)
    });
}
/*
{
    taskId:
    employeeId: creatorId
    point:
}
*/
export function updatePointTasks(updateRequest) {
    return request({
        url: leadUrl + "/update-point",
        method: 'PATCH',
        data: JSON.stringify(updateRequest)
    });
}

/*
{
    taskId:
    employeeId:
    state:
}
*/
export function updateStateTasks(updateRequest) {
    return request({
        url: url + "/update-state",
        method: 'PATCH',
        data: JSON.stringify(updateRequest)
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

/*
{
    taskId:
    employeeId:
    comment:
}
*/
export function createComment(createRequest) {
    return request({
        url: url + "/comment",
        method: 'POST',
        data: JSON.stringify(createRequest)
    });
}

export function getComments(taskId) {
    return request({
        url: url + "/comment/" + taskId,
        method: 'GET',
    });
}

/*
{
    taskId:
    employeeId:
    comment:
}
*/
export function updateComments(updateRequest) {
    return request({
        url: url + "/comment",
        method: 'PUT',
        data: JSON.stringify(updateRequest)
    });
}