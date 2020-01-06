import {
    UPDATE_CREATOR_TASKS
} from '../action/task';

const initState = {
    creatorTasks: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_CREATOR_TASKS:
            return {
                creatorTasks: action.creatorTasks
            };
        default:
            return state;
    }
};

export default reducer;