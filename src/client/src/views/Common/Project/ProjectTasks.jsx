import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import { getTasksByAdmin, getTasksCreatedByLead } from '../../../action/task';
import { loginAsAdmin, loginAsLead, loginAsStaff } from '../../../action/auth';

import { TaskContainer, Task, NewTask, CollapsibleSection } from '../../../components'
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

    }
});
class ProjectTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creatorTasks: [],
        }
        this.getName = this.getName.bind(this);
        this.getMember = this.getMember.bind(this);
        this.getNameMember = this.getNameMember.bind(this);
        this.updateTask = this.updateTask.bind(this);
    }

    getName(employee) {
        if(employee) {
            return employee.lastName + " " + employee.firstName;
        }
        return 'Administrator'
    }

    getNameMember(memberId) {
        return this.getName(this.getMember(memberId));
    }

    getMember(memberId) {
        const { projectItem } = this.props;
        let members = projectItem.members;
        let result = members.filter((member) => {
            console.log("getMember : compare " + member.id + " - " + memberId);
            return member.id == memberId;
        })[0];
        console.log("getMember : " + result);
        return result;
    }

    componentDidMount() {
        const { alert } = this.props;
        const { loginRole, projectItem, currentUser } = this.props;
        let projectId = projectItem.project.id;
        if (loginAsAdmin(loginRole)) {
            getTasksByAdmin(projectId)
                .then(response => {
                    console.log("getTasksByAdmin : " + JSON.stringify(response));
                    this.setState({
                        creatorTasks: response.creatorTasks,
                    })
                })
        } else if (loginAsLead(loginRole)) {
            getTasksCreatedByLead(projectId, currentUser.id)
                .then(response => {
                    console.log("getTasksCreatedByLead : " + JSON.stringify(response));
                })
        } else {
            alert.error('Oops! Something went wrong. Please try again!');
        }
    }

    updateTask(creator) {
        let creatorTasks = this.state.creatorTasks;
        let updateIndex = 0;
        for(let i = 0; i < creatorTasks.length ; i++) {
            if(creatorTasks[i].creatorId == creator.creatorId) {
                updateIndex = i;
                break;
            }
        }
        creatorTasks[updateIndex] = creator;
        this.setState({
            creatorTasks : creatorTasks,
        });
    }

    render() {
        const { classes } = this.props;
        const { projectItem } = this.props;
        const { creatorTasks } = this.state;
        return (
            <React.Fragment>
                {/* Hello Project Task : This will show in 2 mode
                - Table
                - Card task employee*/}
                <div className={classes.root}>
                    <div className={classes.header}>
                        <div className={classes.header_section}>
                            <NewTask />
                        </div>
                        <div className={classes.header_section}>

                        </div>
                        <div className={classes.header_section}>
                            Change mode
                        </div>
                    </div>
                    <div className={classes.content}>
                        {creatorTasks && creatorTasks.map((creator, index) => {
                            console.log("Creator : " + JSON.stringify(creator));
                            let title = this.getNameMember(creator.creatorId);
                            return (
                                <CollapsibleSection key={index} title={title}>
                                    <TaskContainer creator={creator} updateTask={this.updateTask}/>
                                </CollapsibleSection>
                            )
                        })}
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