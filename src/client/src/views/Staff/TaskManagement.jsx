import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SwipeableViews from 'react-swipeable-views';

import { CenteredTabs, TabPanel } from '../../components';

import { OverviewTask, AdminDashboard } from '../'

import styles from "../../assets/jss/styles/views/taskManagementStyle";

class TaskManagement extends Component {
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
        const tabs = [
            {
                name: "Overview",
                component: OverviewTask,
            },
            {
                name: "Analytics",
                component: AdminDashboard,
            }
        ];
        const { classes } = this.props;
        const { match } = this.props;
        let projectId = this.props.match.params.projectId;
        console.log("Tasks of projectId : " + projectId);
        if (projectId === 'project') {
            return (
                <div>No project selected</div>
            )
        }
        return (
            <div className={classes.root}>
                <div className={classes.sub_layout_header}>
                    <div className={classes.sub_header}>
                        <div className={classes.sub_header_section}>

                        </div>
                        <div className={classes.sub_header_section}>
                            <CenteredTabs handleChange={this.handleChange} value={this.state.value} tabs={tabs} />
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
                        {
                            tabs.map((tab, key) => (
                                <TabPanel key={key} value={this.state.value} index={key}>
                                    <tab.component />
                                </TabPanel>
                            ))
                        }
                    </SwipeableViews>
                </div>
            </div>
        );
    }
}

TaskManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TaskManagement);