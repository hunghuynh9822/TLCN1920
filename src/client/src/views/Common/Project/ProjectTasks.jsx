import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { TaskContainer, Task } from '../../../components'
const styles = theme => ({
    root: {

    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '35px',
        lineHeight: '35px',
        backgroundColor: 'white',
    },
    header_section: {
        flexBasis: '33%',
    },
    content: {

    }
});
class ProjectTasks extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const { projectItem } = this.props;
        return (
            <React.Fragment>
                {/* Hello Project Task : This will show in 2 mode
                - Table
                - Card task employee*/}
                <div className={classes.root}>
                    <div className={classes.header}>
                        <div className={classes.header_section}>
                            
                        </div>
                        <div className={classes.header_section}>

                        </div>
                        <div className={classes.header_section}>
                            Change mode
                        </div>
                    </div>
                    <div className={classes.content}>
                        <TaskContainer>
                            {this.state.listUser.map((user, index) => <Task key={index} user={user} />)}
                        </TaskContainer>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
ProjectTasks.propTypes = {
    classes: PropTypes.object.isRequired,
    projectItem: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProjectTasks);