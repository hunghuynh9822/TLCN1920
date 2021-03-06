import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Route,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import { ROUTER_MAP, PATH_MAP } from '../../constants';
import { loginRole } from '../../action/auth'
class PrivateRoute extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { authenticated, path, currentUser, defaultPath } = this.props;
        console.log("PrivateRoute authenticated : " + JSON.stringify(authenticated) + " current user " + JSON.stringify(currentUser));
        if (authenticated && currentUser) {
            let paths = currentUser.roles.map((role) => {
                let path = ROUTER_MAP[role.name];
                return path;
            });
            console.log("Paths " + JSON.stringify(paths) + " current path " + path);
            if (!paths.includes(path)) {
                console.log("not included " + path);
                console.log("Login role " + PATH_MAP[defaultPath]);
                this.props.updateLoginRole(PATH_MAP[defaultPath]);
                return (<Redirect to={{
                    pathname: defaultPath,
                    state: { from: this.props.location }
                }} />);
            } else {
                console.log("Login role " + PATH_MAP[path]);
                this.props.updateLoginRole(PATH_MAP[path]);
            }
        } else {
            this.props.updateLoginRole(null);
        }
    }

    render() {
        const { component: Component, authenticated, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={(props) =>
                    authenticated ? (
                        <Component {...rest} {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: props.location }
                                }}
                            />
                        )
                }
            />
        );
    }
}
PrivateRoute.propTypes = {
    component: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: state.auth.authenticated,
        currentUser: state.auth.currentUser,
        defaultPath: state.auth.defaultPath,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateLoginRole: (role) => dispatch(loginRole(role)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);