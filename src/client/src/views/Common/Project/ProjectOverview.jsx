import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import axios from 'axios';
import { CollapsibleSection, Project, NewProject } from '../../../components';

import { updateProjectId, getAllProjects, getProjects } from '../../../action/project';
import { hasRoleAdmin } from '../../../action/auth';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {

    },
    wrapper: {
        padding: '0px 55px 0px 55px',
    },
    margin: {
        margin: theme.spacing(1),
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
        this.handleNewProject = this.handleNewProject.bind(this);
    }

    addPro(pro) {
        var temp = this.state.projects;
        temp.push(pro);
        this.setState({ projects: temp });
    }

    componentDidMount() {
        // getAllProjects()
        //     .then(response => {
        //         console.log(response);
        //         const projects = response;
        //         this.setState({ projects: projects })

        //     })
        //     .catch(error => console.log("ok loi ne " + error))
    }

    handleNewProject() {
        getAllProjects()
            .then(response => {
                console.log(response);
                // const projects = response;
                // this.setState({ projects: projects })

            })
            .catch(error => console.log("ok loi ne " + error))
    }

    render() {
        const { classes } = this.props;
        const { currentRole } = this.props;
        console.log("Has role admin " + hasRoleAdmin(currentRole))
        return (
            <div className={classes.root}>
                <div className={classes.sub_header}>
                    <Button onClick={this.handleNewProject} size="medium" color="primary" className={classes.margin}>
                        <AddIcon className={classes.addIcon} style={{ fontSize: 20 }} />
                        New project
                    </Button>
                </div>
                <div className={classes.wrapper}>
                    <CollapsibleSection title="Recent Projects">
                        {this.state.projects.map(item => <Project value={item} />)}
                    </CollapsibleSection>
                    <CollapsibleSection title="My Project">
                        {this.state.projects.map(item => <Project value={item} />)}
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProjectOverview));