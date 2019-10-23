import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import { redirect } from '../util/AuthUtils';

import { authenticate, getCurrentUser } from '../action/auth'

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
        const { authenticated, currentUser } = this.props;
        if (authenticated && currentUser) {
            let roles = currentUser.roles;
            if (authenticated) {
                if (roles && roles.length !== 0) {
                    return redirect(this.props, roles);
                }
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
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        authenticate: (authenticated, currentUser) => dispatch(authenticate(authenticated, currentUser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));