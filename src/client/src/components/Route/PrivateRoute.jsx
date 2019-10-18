import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Route,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
class PrivateRoute extends Component {
    constructor(props) {
        super(props);
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
export default PrivateRoute;