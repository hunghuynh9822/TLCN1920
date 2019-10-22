import { LOG_IN, LOG_OUT } from '../action/auth';
const initState = {
    authenticated: false,
    currentUser: null,
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case LOG_IN:
            console.log("LOG_IN")
            return {
                ...state,
                authenticated: action.authenticated,
                currentUser: action.currentUser,
            };
        case LOG_OUT:
            console.log("LOG_OUT")
            return {
                ...state,
                authenticated: action.authenticated,
                currentUser: null,
            };
        default:
            return state;
    }
};
export default reducer;