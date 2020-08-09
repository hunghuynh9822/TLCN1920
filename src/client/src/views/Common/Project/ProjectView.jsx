import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import SwipeableViews from 'react-swipeable-views';

import { CenteredTabs, TabPanel, Loading } from '../../../components';

import { ProjectDetails, ProjectTasks, GanttChart, ProjectAnalytics } from '../..'

import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { updateProjectItem, getEmployeeFree, getProject } from '../../../action/project';
import { loginAsAdmin, loginAsLead, loginAsStaff } from '../../../action/auth';

const styles = theme => ({
    sub_layout_header: {

    },
    sub_header: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '35px',
        lineHeight: '35px',
        backgroundColor: 'white',
    },
    sub_header_section: {
        flexBasis: '33%',
    },
    tab_header: {
        marginBottom: '5px',
    },
    content: {
        // padding: '0px 55px 0px 55px',
    },
    margin: {
        margin: theme.spacing(1),
        marginTop: 0,
        marginBottom: 0,
    },
    tabpanel: {
        overflow: 'hidden',
        minHeight: "calc(100vh - 150px)",
    }
});

class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            freeEmployees: [],
            projectItem: null,
            projectId: null,
            loading: false,
        }
        this.handleBack = this.handleBack.bind(this);
        this.updateFreeEmployee = this.updateFreeEmployee.bind(this);
        this.loadProject = this.loadProject.bind(this);
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
    handleBack() {
        const { match } = this.props;
        let path = match.path;
        let back = path.substring(0, path.lastIndexOf('/'));
        this.props.updateProjectItem(null);
        console.log("back :" + back)
        this.props.history.push(back);
    }

    updateFreeEmployee(freeEmployee) {
        this.setState({
            freeEmployees: freeEmployee,
        })
    }

    loadProject() {
        const { alert } = this.props;
        const { projectItem, updateProjectItem } = this.props;
        const projectId = projectItem.project.id;
        getProject(projectId)
            .then(response => {
                console.log("Get project : " + JSON.stringify(response));
                updateProjectItem(response);
                getEmployeeFree(projectId)
                    .then(responseEmployee => {
                        console.log("Free employee : " + JSON.stringify(responseEmployee));
                        this.setState({
                            projectItem: response,
                            projectId: projectId,
                            freeEmployees: responseEmployee.employees
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        alert.error('Oops! Something went wrong. Please try again!');
                    })
            })
            .catch(error => {
                console.log(error)
                alert.error('Oops! Something went wrong. Please try again!');
            })
    }

    componentDidMount() {
        const { match } = this.props;
        const { alert } = this.props;
        const { projectItem, updateProjectItem } = this.props;
        if (projectItem !== undefined && projectItem !== null) {
            const projectId = projectItem.project.id;
            if (projectId != match.params.projectId) {
                this.handleBack();
            }
        }
        // this.handleBack();
        this.setState({
            loading: true
        });
        let projectId = match.params.projectId;
        getProject(projectId)
            .then(response => {
                console.log("Get project : " + JSON.stringify(response));
                updateProjectItem(response);
                getEmployeeFree(projectId)
                    .then(responseEmployee => {
                        console.log("Free employee : " + JSON.stringify(responseEmployee));
                        this.setState({
                            projectItem: response,
                            projectId: projectId,
                            freeEmployees: responseEmployee.employees,
                            loading: false
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        alert.error('Oops! Something went wrong when get free employee for ' + projectId + '. Please call check!');
                    })
            })
            .catch(error => {
                console.log(error)
                this.handleBack();
            })
        // }
    }

    render() {
        const { classes } = this.props;
        const tabs = [
            {
                name: "Overview",
                component: ProjectDetails,
            },
            {
                name: "Tasks",
                component: ProjectTasks,
            },
            {
                name: "Timeline",
                component: GanttChart,
            },
            {
                name: "Analytics",
                component: ProjectAnalytics,
            }
        ];
        const { match } = this.props;
        const { alert } = this.props;
        let { projectItem, projectId } = this.state;
        console.log("ProjectView : " + projectId);
        if (this.state.loading) {
            return <Loading />
        }
        return (
            <React.Fragment>
                <div className={classes.sub_layout_header}>
                    <div className={classes.sub_header}>
                        <div className={classes.sub_header_section}>
                            <Button onClick={this.handleBack} size="medium" color="primary" className={classes.margin}>
                                <ArrowBackIosIcon className={classes.backIcon} style={{ fontSize: 20 }} />
                                Back
                            </Button>
                        </div>
                        <div className={classes.sub_header_section}>
                            <CenteredTabs handleChange={this.handleChange} value={this.state.value} tabs={tabs} />
                        </div>
                        <div className={classes.sub_header_section}>
                            {/* {"WikiPage"} */}
                        </div>
                    </div>
                </div>
                {/* <div className={classes.sub_layout_header}>
                    <div className={classes.tab_header}>
                        <CenteredTabs handleChange={this.handleChange} value={this.state.value} tabs={tabs} />
                    </div>
                </div> */}
                <div className={classes.content}>
                    <SwipeableViews
                        axis={'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                        style={{
                            minHeight: '100%',
                            overflow: 'hidden'
                        }}
                        slideStyle={{
                            minHeight: '100%',
                        }}
                    >
                        {
                            tabs.map((tab, key) => (
                                <TabPanel key={key} value={this.state.value} index={key} className={classes.tabpanel}>
                                    {
                                        projectItem && (
                                            <tab.component loginRole={this.props.loginRole} index={this.state.value} loadProject={this.loadProject} projectItem={projectItem} freeEmployees={this.state.freeEmployees} updateFreeEmployee={this.updateFreeEmployee} updateProjectItem={updateProjectItem} handleBack={this.handleBack} />
                                        )
                                    }
                                </TabPanel>
                            ))
                        }
                    </SwipeableViews>
                </div>
            </React.Fragment>
        );
    }
}
ProjectView.propTypes = {
    classes: PropTypes.object.isRequired,
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
        updateProjectItem: (projectItem) => dispatch(updateProjectItem(projectItem)),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(ProjectView)));