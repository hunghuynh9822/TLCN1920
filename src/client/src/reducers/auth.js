import { LOG_IN, LOG_OUT, UPDATE_USER } from '../action/auth';
import {ROUTER_MAP} from '../constants'
const initState = {
    authenticated: false,
    currentUser: null,
    paths: null,
    defaultPath: null,
    currentRole: null,
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case LOG_IN:
            console.log(LOG_IN)
            let paths, path, currentRole = [];
            if (action.currentUser) {
                let user = action.currentUser;
                let roles = user.roles;
                let maxRole = roles[0];
                paths = user.roles.map((role) => {
                    currentRole.push(role.name);
                    if (maxRole.id > role.id) {
                        maxRole = role;
                    }
                    let path = ROUTER_MAP[role.name];
                    return path;
                });
                path = ROUTER_MAP[maxRole.name];
            }
            return {
                ...state,
                authenticated: action.authenticated,
                currentUser: action.currentUser,
                paths: paths,
                defaultPath: path,
                currentRole: currentRole
            };
        case LOG_OUT:
            console.log(LOG_OUT)
            return {
                ...state,
                authenticated: false,
                currentUser: null,
                paths: null,
                defaultPath: null,
                currentRole: null
            };
        case UPDATE_USER:
            console.log(UPDATE_USER)
            return {
                ...state,
                currentUser: action.user
            }
        default:
            return state;
    }
};
export default reducer;