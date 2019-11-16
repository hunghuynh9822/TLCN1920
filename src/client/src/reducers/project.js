import {
    UPDATE_PROJECT_ID
} from '../action/project';

const initState = {
    projectId: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_PROJECT_ID:
            return {
                projectId: action.projectId
            };
        default:
            return state;
    }
};

export default reducer;