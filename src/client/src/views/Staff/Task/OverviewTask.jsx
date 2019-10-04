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
    render() {
        const { classes } = this.props;
        return (
            <TaskContainer>
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
            </TaskContainer>
        );
    }
}
OverviewTask.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OverviewTask);