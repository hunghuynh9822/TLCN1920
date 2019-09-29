import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';

import { withRouter, Switch, Route, Redirect } from "react-router-dom";

// core components
import { OverviewProject, CenteredTabs, TabPanel } from "../../components"

import styles from "../../assets/jss/styles/views/projectManagementStyle";

class ProjectsManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
    }
    a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }
    handleChange = (event, newValue) => {
        this.setState({
            value: newValue,
        })
    }
    handleChangeIndex = index => {
        this.setState({
            value: index,
        })
    };
    render() {
        // styles
        const { classes ,match } = this.props;
        const { routes } = this.props;
        console.log(match);
        console.log(routes);
        return (
            <div className={classes.root}>
                <div className={classes.sub_layout_header}>
                    <div className={classes.sub_header}>
                        <div className={classes.sub_header_section}>

                        </div>
                        <div className={classes.sub_header_section}>
                            <CenteredTabs handleChange={this.handleChange} value={this.state.value}/>
                        </div>
                        <div className={classes.sub_header_section}>

                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    <SwipeableViews
                        axis={'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabPanel value={this.state.value} index={0}>
                            <OverviewProject />
                        </TabPanel>
                        <TabPanel value={this.state.value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={this.state.value} index={2}>
                            Item Three
                        </TabPanel>
                    </SwipeableViews>
                </div>
            </div>
        );
    }
}

ProjectsManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(ProjectsManagement));