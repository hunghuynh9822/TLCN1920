import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from 'react-avatar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    task_tag: {
        display: 'inline-flex',
        background: '#e6e8ec',
        borderRadius: '20px',
        marginBottom: '10px',
    },
    tag_name: {
        lineHeight: '30px',
        padding: '0px 0px 0px 10px',
    },
    icon_close: {
        minWidth: '30px',
        padding: '0px',
        borderRadius: '20px',
        "&:hover": {
            backgroundColor: "#e6e8ec",
            boxShadow: "none"
        }
    },
});
class TagTask extends Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }
    getTaskId(id) {
        return "#" + id;
    }
    handleRemove() {
        const { task, removeTask } = this.props;
        console.log("Task] Remove task : " + JSON.stringify(task));
        removeTask(task);
    }
    render() {
        const { classes } = this.props;
        const { task } = this.props;
        return (
            <div className={classes.task_tag}>
                <div className={classes.tag_name}>{task.title}</div>
                <Button onClick={this.handleRemove} size="medium" color="primary" className={classes.icon_close}><CloseIcon fontSize="small" /></Button>
            </div>
        );
    }
}
TagTask.propTypes = {
    classes: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    removeTask: PropTypes.func.isRequired,
};
export default withStyles(styles)(TagTask);