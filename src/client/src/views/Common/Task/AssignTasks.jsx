import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import { getTasksByAdmin, getTasksCreatedByLead } from '../../../action/task';
import { loginAsAdmin, loginAsLead, loginAsStaff } from '../../../action/auth';

import { TaskContainer, Task, NewTask, CollapsibleSection } from '../../../components'

const styles = theme => ({

});
class AssignTasks extends Component {
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
        for (let i = 0; i < creatorTasks.length; i++) {
            if (creatorTasks[i].creatorId == creator.creatorId) {
                updateIndex = i;
                break;
            }
        }
        creatorTasks[updateIndex] = creator;
        this.setState({
            creatorTasks: creatorTasks,
        });
    }

    getName(employee) {
        if (employee) {
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

    render() {
        const { classes } = this.props;
        const { creatorTasks } = this.state;
        return (
            <React.Fragment>
                {creatorTasks && creatorTasks.map((creator, index) => {
                    console.log("Creator : " + JSON.stringify(creator));
                    let title = this.getNameMember(creator.creatorId);
                    return (
                        <CollapsibleSection key={index} title={title}>
                            <TaskContainer creator={creator} updateTask={this.updateTask} filter="DONE"/>
                        </CollapsibleSection>
                    )
                })}
            </React.Fragment>
        );
    }
}
AssignTasks.propTypes = {
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

    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(AssignTasks)));