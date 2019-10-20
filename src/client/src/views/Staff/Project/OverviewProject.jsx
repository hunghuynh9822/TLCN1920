import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { CollapsibleSection, Project, NewProject } from '../../../components';

const styles = theme => ({
    root:{
        padding: '0px 55px 0px 55px',
    }
});

class OverviewProject extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        projects : []
    }

    componentDidMount(){
        axios.get('http://localhost:8080/promicro/listProject')
        .then(response =>{
            console.log(response.data);
            // console.log(response.status);
            // console.log(response.statusText);
            // console.log(response.headers);
            // console.log(response.config);
            const projects = response.data;
            this.setState({projects})
            console.log(response.data);
            
        })
        .catch(error => console.log("ok loi ne "+error))
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
                    <NewProject />
                </CollapsibleSection>
            </div>
        );
    }
}
OverviewProject.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OverviewProject);