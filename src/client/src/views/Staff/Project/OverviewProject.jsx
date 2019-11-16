import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import axios from 'axios';
import { CollapsibleSection, Project, NewProject } from '../../../components';

import { updateProjectId } from '../../../action/project';

const styles = theme => ({
    root: {
        padding: '0px 55px 0px 55px',
    }
});

class OverviewProject extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        projects: []
    }

    addPro(pro) {
        var temp = this.state.projects;
        temp.push(pro);
        this.setState({ projects: temp });
    }

    componentDidMount() {
        axios.get('http://192.168.200.1:8080/promicro/listProject')
            .then(response => {
                console.log(response.data);
                const projects = response.data;
                this.setState({ projects: projects })

            })
            .catch(error => console.log("ok loi ne " + error))
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CollapsibleSection title="Recent Projects">
                    {this.state.projects.map(item => <Project value={item} />)}
                </CollapsibleSection>
                <CollapsibleSection title="My Project">
                    {this.state.projects.map(item => <Project value={item} />)}
                    <NewProject addPro={this.addPro} />
                </CollapsibleSection>
            </div>
        );
    }
}
OverviewProject.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        projectId: state.project.projectId,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProjectId: (projectId) => dispatch(updateProjectId(projectId)),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(OverviewProject));