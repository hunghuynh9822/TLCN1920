import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import axios from 'axios';
import { CollapsibleSection, Project, NewProject, SlideContainer, SpeedDialTooltipOpen } from '../../../components';

import { updateProjectItem, getAllProjects, getProjects } from '../../../action/project';
import { loginAsAdmin, loginAsLead, loginAsStaff } from '../../../action/auth';

import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';

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
        marginTop: '-10px',
    },
    sub_header: {
        minHeight: '45px',
        lineHeight: '45px',
        backgroundColor: 'white',
    },
    cardAdd: {
        width: 275,
        height: 200,
        margin: theme.spacing(2),
        position: 'relative',
        textAlign: 'center',
        lineHeight: '200px',
        color: '#bfbfbf'
    }
});

class ProjectOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            openForm: false,
        }
        this.handleToProject = this.handleToProject.bind(this);
        this.renderProjects = this.renderProjects.bind(this);
        this.renderCardAddProject = this.renderCardAddProject.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderComponentProjects = this.renderComponentProjects.bind(this);
    }

    handleOpen() {
        console.log("[Project] Open form create")
        this.setState({
            openForm: true,
        })
    }

    handleClose() {
        this.setState({
            openForm: false,
        })
    }

    componentDidMount() {
        const { alert } = this.props;
        const { currentUser, loginRole } = this.props;
        if (loginAsAdmin(loginRole)) {
            getAllProjects()
                .then(response => {
                    console.log(response);
                    this.setState({ projects: response.projectResponses })

                })
                .catch(error => {
                    console.log(error)
                    alert.error('Oops! Something went wrong. Please try again!');
                })
        } else if (loginAsLead(loginRole) || loginAsStaff(loginRole)) {
            getProjects(currentUser.id)
                .then(response => {
                    console.log(response);
                    this.setState({ projects: response })

                })
                .catch(error => {
                    console.log(error)
                    alert.error('Oops! Something went wrong. Please try again!');
                })
        } else {
            alert.error('Oops! Something went wrong. Please try again!');
        }

    }

    handleToProject(projectItem) {
        const { alert } = this.props;
        const { match } = this.props;
        const { updateProjectItem } = this.props;
        let path = match.path;
        let next = path.concat("/", projectItem.project.id);
        updateProjectItem(projectItem);
        console.log("next :" + next)
        this.props.history.push(next);
    }

    renderCardAddProject() {
        const { classes } = this.props;
        return (
            <Card className={classes.cardAdd} onClick={this.handleOpen}>
                <AddIcon className={classes.addIcon} style={{ fontSize: 100 }} />
            </Card>
        )
    }

    renderComponentProjects(projects) {
        const { classes } = this.props;
        if (projects) {
            return projects.map((item, key) => <Project key={key} projectItem={item} handleToProject={this.handleToProject} />)
        }
        return "No projects"
    }

    renderProjects() {
        const { classes } = this.props;
        const { alert } = this.props;
        const { loginRole } = this.props;
        const { projects } = this.state;
        console.log("[Project] Render projects with login role " + loginRole);
        if (loginAsAdmin(loginRole)) {
            let recentName = "Recent Projects";
            recentName = recentName.concat(" ( ", projects !== undefined ? projects.length : 0, " )");
            let allName = "All Projects";
            allName = allName.concat(" ( ", projects !== undefined ? projects.length : 0, " )");
            return (
                <div className={classes.wrapper}>
                    {/* <CollapsibleSection title={recentName}>
                        <SlideContainer>
                            {projects && projects.map((item, key) => <Project key={key} projectItem={item} handleToProject={this.handleToProject} />)}
                        </SlideContainer>
                    </CollapsibleSection> */}
                    <CollapsibleSection title={allName}>
                        <div className={classes.viewproject}>
                            {projects && projects.map((item, key) => <Project key={key} projectItem={item} handleToProject={this.handleToProject} />)}
                            {this.renderCardAddProject()}
                        </div>
                    </CollapsibleSection>
                </div>
            );
        } else if (loginAsLead(loginRole)) {
            let recentName = "Recent Projects";
            recentName = recentName.concat(" ( ", projects.ownProjects !== undefined ? projects.ownProjects.length : 0, " )");
            let ownName = "Owner Projects";
            ownName = ownName.concat(" ( ", projects.ownProjects !== undefined ? projects.ownProjects.length : 0, " )");
            let joinName = "Join Projects";
            joinName = joinName.concat(" ( ", projects.joinProjects !== undefined ? projects.joinProjects.length : 0, " )")
            return (
                <div className={classes.wrapper}>
                    <CollapsibleSection title={ownName}>
                        <div className={classes.viewproject}>
                            {projects.ownProjects && projects.ownProjects.map((item, key) => <Project key={key} projectItem={item} handleToProject={this.handleToProject} />)}
                            {this.renderCardAddProject()}
                        </div>
                    </CollapsibleSection>
                    <CollapsibleSection title={joinName}>
                        <div className={classes.viewproject}>
                            {this.renderComponentProjects(projects.joinProjects)}
                        </div>
                    </CollapsibleSection>
                </div>
            );
        } else if (loginAsStaff(loginRole)) {
            let ownName = "Owner Projects";
            ownName = ownName.concat(" ( ", projects.ownProjects !== undefined ? projects.ownProjects.length : 0, " )");
            let joinName = "Join Projects";
            joinName = joinName.concat(" ( ", projects.joinProjects !== undefined ? projects.joinProjects.length : 0, " )")
            return (
                <div className={classes.wrapper}>
                    <CollapsibleSection title={ownName}>
                        <div className={classes.viewproject}>
                            {this.renderComponentProjects(projects.ownProjects)}
                        </div>
                    </CollapsibleSection>
                    <CollapsibleSection title={joinName}>
                        <div className={classes.viewproject}>
                            {this.renderComponentProjects(projects.joinProjects)}
                        </div>
                    </CollapsibleSection>
                </div>
            );
        } else {
            alert.error('Oops! You do not have permision!');
        }
    }

    render() {
        const { classes } = this.props;
        const { currentUser, currentRole, loginRole } = this.props;
        console.log("Login as admin " + loginRole + " " + loginAsAdmin(loginRole))
        return (
            <div className={classes.root}>
                {/* <div className={classes.sub_header}>
                </div> */}
                {this.renderProjects()}
                <SpeedDialTooltipOpen openCreate={this.handleOpen} />
                <NewProject currentUser={currentUser} currentRole={currentRole} handleToProject={this.handleToProject} open={this.state.openForm} handleClose={this.handleClose} />
            </div>
        );
    }
}
ProjectOverview.propTypes = {
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(ProjectOverview)));