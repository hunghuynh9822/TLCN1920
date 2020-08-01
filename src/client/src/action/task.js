import {
    request
} from '.';

const url = '/api/tasks';
const superUrl = '/api/admin/tasks';
const leadUrl = '/api/lead/tasks';

export const TASK_STATE = [
    'NEW', 'DEVELOPING', 'DEVELOPED', 'TESTING', 'DONE', 'FINISH'
]

export const TASK_STATE_COLOR = {
    "NEW": "#0ac400",
    "DEVELOPING": "#e69900",
    "DEVELOPED": "#00d8db",
    "TESTING": "#ff0000",
    "DONE": "#0026ff",
    "FINISH": "#0026ff"
}

export const UPDATE_PROJECT_TASKS = 'UPDATE_PROJECT_TASKS';
export const RELOAD_TASKS = 'RELOAD_TASKS';

//Redux
export function updateProjectTasks(projectTasks) {
    return {
        type: UPDATE_PROJECT_TASKS,
        projectTasks
    };
}

export function reloadTasks(ganttTasks) {
    console.log("[Gantt] reloadTasks ", ganttTasks)
    return {
        type: RELOAD_TASKS,
        ganttTasks
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

export function getTasks(project) {
    return request({
        url: url + "/" + "?" + "project=" + project,
        method: 'GET',
    });
}

export function getTasksOfProject(project) {
    return request({
        url: url + "/project" + "?" + "project=" + project,
        method: 'GET',
    });
}

export function getTasksWithStateOfProject(project) {
    return request({
        url: url + "/project/state" + "?" + "project=" + project,
        method: 'GET',
    });
}

export function getTasksAssigneeWithStateOfProject(project) {
    return request({
        url: url + "/project/assignee/state" + "?" + "project=" + project,
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
    preTaskId:
}
*/
export function updateTask(updateRequest) {
    return request({
        url: url + "/update",
        method: 'PUT',
        data: JSON.stringify(updateRequest)
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