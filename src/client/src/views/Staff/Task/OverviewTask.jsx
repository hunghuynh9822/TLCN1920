import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {TaskContainer,Task} from '../../../components'
const styles = theme => ({

});
class OverviewTask extends Component {
    constructor(props) {
        super(props); 
             
    }
    state = {
        listUser : [
            { "id": "1", "name" : "Liem" },
            { "id": "2", "name" : "Hung" }
        ],
        
    }
    

    render() {
        const { classes } = this.props;
       
        return (
            <TaskContainer>
                {this.state.listUser.map(user => <Task user={user}/>)}      
            </TaskContainer>
        );
    }
}
OverviewTask.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OverviewTask);