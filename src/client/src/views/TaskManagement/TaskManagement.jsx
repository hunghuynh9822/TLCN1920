import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// core components
import {Task, TaskContainer} from "../../components"

import styles from "../../assets/jss/material-react/views/taskManagementStyle";

class TaskManagement extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // styles
        const { classes } = this.props;
        return (
            <React.Fragment>
                <TaskContainer>
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </TaskContainer>
            </React.Fragment>
        );
    }
}

TaskManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TaskManagement)