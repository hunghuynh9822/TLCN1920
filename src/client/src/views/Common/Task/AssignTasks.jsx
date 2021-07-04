import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import { getTasks } from '../../../action/task';
import { loginAsAdmin, loginAsLead, loginAsStaff } from '../../../action/auth';
import { updateProjectTasks } from '../../../action/task';

import { TaskContainer, Task, NewTask, CollapsibleSection } from '../../../components'

const styles = theme => ({

});
class AssignTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.getName = this.getName.bind(this);
        this.getMember = this.getMember.bind(this);
        this.getNameMember = this.getNameMember.bind(this);
    }

    componentDidMount() {

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
            // console.log("getMember : compare " + member.id + " - " + memberId);
            return member.id == memberId;
        })[0];
        console.log("getMember : " + JSON.stringify(result));
        return result;
    }

    render() {
        const { classes } = this.props;
        const { projectTasks } = this.props;
        return (
            <React.Fragment>
                <CollapsibleSection title={"Task"}>
                    <TaskContainer loadTasks={this.props.loadTasks} openForm={this.props.openForm} />
                </CollapsibleSection>
            </React.Fragment>
        );
    }
}
AssignTasks.propTypes = {
    classes: PropTypes.object.isRequired,
    loadTasks: PropTypes.func.isRequired,
    openForm: PropTypes.func.isRequired,
    projectTasks: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        projectItem: state.project.projectItem,
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
        loginRole: state.auth.loginRole,
        projectTasks: state.tasks.projectTasks,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProjectTasks: (projectTasks) => dispatch(updateProjectTasks(projectTasks)),
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(AssignTasks)));