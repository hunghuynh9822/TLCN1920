import { LOG_IN, LOG_OUT } from '../action/auth';
import {ROUTER_MAP} from '../constants'
const initState = {
    authenticated: false,
    currentUser: null,
    paths: null,
    defaultPath: null,
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case LOG_IN:
            console.log("LOG_IN")
            let paths, path;
            if (action.currentUser) {
                let user = action.currentUser;
                let roles = user.roles;
                let maxRole = roles[0];
                paths = user.roles.map((role) => {
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
                defaultPath: path
            };
        case LOG_OUT:
            console.log("LOG_OUT")
            return {
                ...state,
                authenticated: false,
                currentUser: null,
                paths: null,
                defaultPath: null,
            };
        default:
            return state;
    }
};
export default reducer;