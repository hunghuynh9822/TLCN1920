import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACCESS_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom';

import { authenticate } from '../../action/auth';

class OAuth2RedirectHandler extends Component {
    constructor(props) {
        super(props);
    }
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        console.log(token);
        console.log(error);

        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            this.props.authenticate(true, null);
            return <Redirect to={{
                pathname: "/home",
                state: { from: this.props.location }
            }} />;
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: {
                    from: this.props.location,
                    error: error
                }
            }} />;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: state.auth.authenticated,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        authenticate: (authenticated, currentUser) => dispatch(authenticate(authenticated, currentUser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuth2RedirectHandler);