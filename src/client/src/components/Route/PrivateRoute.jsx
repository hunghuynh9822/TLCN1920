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
        const { children, ...rest } = this.props;
        const isAuthenticated = true;
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    isAuthenticated ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/",
                                    state: { from: location }
                                }}
                            />
                        )
                }
            />
        );
    }
}
PrivateRoute.propTypes = {

};
export default PrivateRoute;