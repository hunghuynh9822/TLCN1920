import {
    UPDATE_PROJECT_ID
} from '../action/project';

const initState = {
    projectItem: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_PROJECT_ID:
            return {
                projectItem: action.projectItem
            };
        default:
            return state;
    }
};

export default reducer;