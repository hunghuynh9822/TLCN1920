import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { withRouter, Switch, Route, Redirect } from "react-router-dom";

// core components
import { OverviewProject } from "../../components"

import styles from "../../assets/jss/styles/views/projectManagementStyle";

class ProjectsManagement extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // styles
        const { classes, match } = this.props;
        const { routes } = this.props;
        console.log(match);
        console.log(routes);
        return (
            <div className={classes.root}>
                <div className={classes.sub_layout_header}>
                    <div className={classes.sub_header}>
                        <div className={classes.sub_header_section_left}>
                            aaaa
                        </div>
                        <div className={classes.sub_header_section_center}>
                            aaaaaa
                        </div>
                        <div className={classes.sub_header_section_right}>
                            aaaaaa
                        </div>
                    </div>
                </div>
                <OverviewProject />
            </div>
        );
    }
}

ProjectsManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(ProjectsManagement));