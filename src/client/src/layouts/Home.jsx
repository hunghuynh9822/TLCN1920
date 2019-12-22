import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

import { authenticate, getCurrentUser, loginRole } from '../action/auth'
import { PATH_MAP } from '../constants'
const styles = theme => ({

});
class Home extends Component {
    constructor(props) {
        super(props);
        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    }
    loadCurrentlyLoggedInUser() {
        if (this.props.authenticated && !this.props.currentUser) {
            getCurrentUser()
                .then(response => {
                    console.log("Get current user success");
                    console.log(response);
                    this.props.authenticate(true, response);
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render() {
        const { classes } = this.props;
        const { authenticated, currentUser, defaultPath } = this.props;
        if (authenticated && currentUser && defaultPath) {
            if (authenticated) {
                this.props.updateLoginRole(PATH_MAP[defaultPath]);
                return <Redirect to={{
                    pathname: defaultPath,
                    state: { from: this.props.location }
                }} />
            }
        }
        return (
            <div> HELLO WORLD </div>
        )
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
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
        authenticate: (authenticated, currentUser) => dispatch(authenticate(authenticated, currentUser)),
        updateLoginRole: (role) => dispatch(loginRole(role)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));