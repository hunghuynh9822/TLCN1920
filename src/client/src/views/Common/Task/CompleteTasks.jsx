import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import { getTasksByAdmin, getTasksCreatedByLead } from '../../../action/task';
import { loginAsAdmin, loginAsLead, loginAsStaff } from '../../../action/auth';
import { updateCreatorTasks } from '../../../action/task';

import { TaskContainer, Task, NewTask, CollapsibleSection } from '../../../components'

const styles = theme => ({

});
class CompleteTasks extends Component {
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
        // console.log("getMember : " + JSON.stringify(result));
        return result;
    }

    render() {
        const { classes } = this.props;
        const { creatorTasks } = this.props;
        return (
            <React.Fragment>
                {creatorTasks && creatorTasks.map((creator, index) => {
                    // console.log("Creator : " + JSON.stringify(creator));
                    let title = this.getNameMember(creator.creatorId);
                    return (
                        <CollapsibleSection key={index} title={title}>
                            <TaskContainer index={index} creator={creator} updateTasks={this.props.updateTasks} loadTasks={this.props.loadTasks} filter="DONE" />
                        </CollapsibleSection>
                    )
                })}
            </React.Fragment>
        );
    }
}
CompleteTasks.propTypes = {
    classes: PropTypes.object.isRequired,
    loadTasks: PropTypes.func.isRequired,
    // creatorTasks: PropTypes.array.isRequired,
    updateTasks: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        projectItem: state.project.projectItem,
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
        loginRole: state.auth.loginRole,
        // creatorTasks: state.tasks.creatorTasks,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateCreatorTasks: (creatorTasks) => dispatch(updateCreatorTasks(creatorTasks)),
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(CompleteTasks)));