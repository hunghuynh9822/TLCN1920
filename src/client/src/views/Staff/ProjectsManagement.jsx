import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
// core components
import { Project,NewProject } from "../../components"

import styles from "../../assets/jss/styles/views/projectManagementStyle";

class ProjectsManagement extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // styles
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.area}>
                    <div className={classes.bar}>
                        <ExpandMore /> Recent Projects
                    </div>
                    <div className={classes.container}>
                        <Project />
                        <Project />
                        <Project />
                    </div>
                </div>
                <div className={classes.area}>
                    <div className={classes.bar}>
                        <ExpandMore /> My Project
                    </div>
                    <div className={classes.container}>
                        <Project />
                        <Project />
                        <Project />
                        <NewProject/>
                    </div>
                </div>
            </div>
        );
    }
}

ProjectsManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProjectsManagement)