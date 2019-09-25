import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// core components
import { Task, TaskContainer } from "../../components"

import styles from "../../assets/jss/styles/views/taskManagementStyle";

class TaskManagement extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // styles
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <TaskContainer>
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </TaskContainer>
            </div>
        );
    }
}

TaskManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TaskManagement)