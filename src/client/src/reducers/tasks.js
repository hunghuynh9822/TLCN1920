import {
    UPDATE_CREATOR_TASKS,
    RELOAD_TASKS
} from '../action/task';

const initState = {
    creatorTasks: null,
    ganttTasks: {
        data: [],
        links: [],
        message: null
    }
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_CREATOR_TASKS:
            return {
                ...state,
                creatorTasks: action.creatorTasks
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