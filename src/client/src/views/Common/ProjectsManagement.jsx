import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { withRouter, Switch, Route } from "react-router-dom";

// core components
import styles from "../../assets/jss/styles/views/projectManagementStyle";

import { updateProjectId } from '../../action/project'

class ProjectsManagement extends Component {
    constructor(props) {
        super(props);
    }
    switchRoutes = (routes) => {
        return (
            <Switch>
                {
                    routes.map((route, key) => {
                        if (route.path === "") {
                            return (
                                <Route
                                    exact
                                    path={route.layout + route.path}
                                    component={route.component}
                                    key={key}
                                />
                            );
                        }
                        if (route.routes === undefined) {
                            return (
                                <Route
                                    exact
                                    key={key}
                                    path={route.layout + route.path}
                                    render={props => (
                                        // pass the sub-routes down to keep nesting
                                        <route.component {...props} {...route} />
                                    )}
                                />
                            );
                        }
                        return (
                            <Route
                                key={key}
                                path={route.layout + route.path}
                                render={props => (
                                    // pass the sub-routes down to keep nesting
                                    <route.component {...props} {...route} />
                                )}
                            />
                        );
                    })
                }
            </Switch>
        );
    }
    render() {
        // styles
        const { classes, match } = this.props;
        const { routes } = this.props;
        console.log(match);
        console.log(routes);
        return (
            <div className={classes.root}>
                {this.switchRoutes(routes)}
            </div>
        );
    }
}

ProjectsManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        projectId: state.project.projectId,
        currentUser: state.auth.currentUser,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProjectId: (projectId) => dispatch(updateProjectId(projectId)),
    }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProjectsManagement)));