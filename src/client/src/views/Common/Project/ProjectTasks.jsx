import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import { NewTask } from '../../../components';
import { AssignTasks, CompleteTasks } from '../../';

import { getTasksByAdmin, getTasksCreatedByLead } from '../../../action/task';
import { loginAsAdmin, loginAsLead, loginAsStaff } from '../../../action/auth';

import SwipeableViews from 'react-swipeable-views';
import { CenteredTabs, TabPanel } from '../../../components';
const styles = theme => ({
    root: {

    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '35px',
        lineHeight: '35px',
        backgroundColor: 'white',
    },
    header_section: {
        flexBasis: '33%',
    },
    content: {

    },
    tabpanel: {
        overflow: 'hidden',
    }
});
const CustomSwipeableViews = withStyles(theme => ({
    root: {
        minHeight: '100%',
        overflow: 'hidden',
    }
}))(SwipeableViews);
class ProjectTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            totalTasks: [],
        }
        this.handleChangeTabs = this.handleChangeTabs.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
        this.updateTasks = this.updateTasks.bind(this);
        this.loadTasks = this.loadTasks.bind(this);
    }

    handleChangeTabs = (event, newValue) => {
        this.setState({
            value: newValue,
        })
    }

    handleChangeIndex = index => {
        this.setState({
            value: index,
        })
    };

    updateTasks(tasks) {
        this.setState({
            totalTasks: tasks,
        })
    }

    loadTasks() {
        const { alert } = this.props;
        const { loginRole, projectItem, currentUser } = this.props;
        let projectId = projectItem.project.id;
        if (loginAsAdmin(loginRole)) {
            getTasksByAdmin(projectId)
                .then(response => {
                    console.log("getTasksByAdmin : " + JSON.stringify(response));
                    this.setState({
                        totalTasks: response.creatorTasks,
                    })
                })
        } else if (loginAsLead(loginRole)) {
            getTasksCreatedByLead(projectId, currentUser.id)
                .then(response => {
                    console.log("getTasksCreatedByLead : " + JSON.stringify(response));
                    this.setState({
                        totalTasks: response.creatorTasks,
                    })
                })
        } else {
            alert.error('Oops! Something went wrong. Please try again!');
        }
    }

    componentDidMount() {
        this.loadTasks();
    }


    render() {
        const { classes } = this.props;
        const { projectItem } = this.props;
        const tabs = [
            {
                name: "Complete Task",
                component: CompleteTasks,
            },
            {
                name: "Assign Task",
                component: AssignTasks,
            }
        ]
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <div className={classes.header}>
                        <div className={classes.header_section}>
                            <NewTask />
                        </div>
                        <div className={classes.header_section}>
                            <CenteredTabs handleChange={this.handleChangeTabs} value={this.state.value} tabs={tabs} />
                        </div>
                        <div className={classes.header_section}>
                            Change mode
                        </div>
                    </div>
                    <div className={classes.content}>
                        <CustomSwipeableViews
                            axis={'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            {
                                tabs.map((tab, key) => (
                                    <TabPanel key={key} value={this.state.value} index={key} className={classes.tabpanel}>
                                        <tab.component creatorTasks={this.state.totalTasks} loadTasks={this.loadTasks} updateTasks={this.updateTasks} />
                                    </TabPanel>
                                ))
                            }
                        </CustomSwipeableViews>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
ProjectTasks.propTypes = {
    classes: PropTypes.object.isRequired,
    projectItem: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        projectItem: state.project.projectItem,
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
        loginRole: state.auth.loginRole,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(ProjectTasks)));