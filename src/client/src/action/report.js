import {
    request
} from '.';

const url = '/api/report';

export function getTasksOfAllEmployeeInProject() {
    return request({
        url: url + "/task_of_employee_in_project",
        method: 'GET',
    });
}
export function getTasksOfEmployeeInProject(project) {
    return request({
        url: url + "/task_of_employee_of_project" + "?project=" + project,
        method: 'GET',
    });
}
export function getNumberTasksByAdmin() {
    return request({
        url: url + "/number_task_on_project",
        method: 'GET',
    });
}
export function getNumberTasksByEmployee(employee) {
    return request({
        url: url + "/number_task_on_project_by_employee" + "?employee=" + employee,
        method: 'GET',
    });
}
export function getOverviewCount() {
    return request({
        url: url + "/count",
        method: 'GET',
    });
}

export function getOverviewCountTaskState(userId) {
    return request({
        url: url + "/count_state_task?user=" + userId,
        method: 'GET',
    });
}