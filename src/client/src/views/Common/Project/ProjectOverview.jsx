import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import axios from 'axios';
import { CollapsibleSection, Project, NewProject, SlideContainer } from '../../../components';

import { updateProjectId, getAllProjects, getProjects } from '../../../action/project';
import { hasRoleAdmin } from '../../../action/auth';

import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {

    },
    wrapper: {
        padding: '0px 55px 0px 55px',
    },
    viewproject: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    sub_header: {
        minHeight: '45px',
        lineHeight: '45px',
        backgroundColor: 'white',
    }
});

class ProjectOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
        this.handleToProject = this.handleToProject.bind(this);
    }

    addPro(pro) {
        var temp = this.state.projects;
        temp.push(pro);
        this.setState({ projects: temp });
    }

    componentDidMount() {
        const { alert } = this.props;
        getAllProjects()
            .then(response => {
                console.log(response);
                this.setState({ projects: response.projects })

            })
            .catch(error => {
                console.log(error)
                alert.error('Oops! Something went wrong. Please try again!');
            })
    }

    handleToProject(projectId) {
        const { alert } = this.props;
        const { match } = this.props;
        let path = match.path;
        let next = path.concat("/", projectId);
        console.log("next :" + next)
        this.props.history.push(next);
    }

    render() {
        const { classes } = this.props;
        const { currentUser, currentRole } = this.props;
        console.log("Has role admin " + hasRoleAdmin(currentRole))
        return (
            <div className={classes.root}>
                <div className={classes.sub_header}>
                    <NewProject currentUser={currentUser} currentRole={currentRole} handleToProject={this.handleToProject}/>
                </div>
                <div className={classes.wrapper}>
                    <CollapsibleSection title="Recent Projects">
                        <SlideContainer>
                            {this.state.projects.map((item, key) => <Project key={key} project={item}  handleToProject={this.handleToProject}/>)}
                        </SlideContainer>
                    </CollapsibleSection>
                    <CollapsibleSection title="My Project">
                        <div className={classes.viewproject}>
                            {this.state.projects.map((item, key) => <Project key={key} project={item}  handleToProject={this.handleToProject}/>)}
                        </div>
                    </CollapsibleSection>
                </div>

            </div>
        );
    }
}
ProjectOverview.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        projectId: state.project.projectId,
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProjectId: (projectId) => dispatch(updateProjectId(projectId)),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(ProjectOverview)));