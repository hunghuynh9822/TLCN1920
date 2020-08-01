import {
    UPDATE_PROJECT_TASKS,
    RELOAD_TASKS
} from '../action/task';

const initState = {
    projectTasks: {
        projectId: null,
        tasks: new Array(),
    },
    ganttTasks: {
        data: [],
        links: [],
        message: null
    }
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_PROJECT_TASKS:
            console.log("[TaskContainer] UPDATE_PROJECT_TASKS ", action)
            return {
                ...state,
                projectTasks: action.projectTasks
            };
        case RELOAD_TASKS:
            console.log("[Gantt] RELOAD_TASKS ", action)
            return {
                ...state,
                ganttTasks: action.ganttTasks
            };
        default:
            return state;
    }
};

export default reducer;