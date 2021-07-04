import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import StarBorder from '@material-ui/icons/StarBorder';
//
import { TASK_STATE, TASK_STATE_COLOR } from '../../action/task'
const styles = theme => ({
    root: {
        boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)!important',
        position: 'absolute',
        zIndex: 2000,
        background: 'white',
        width: '200px',
    }
});
const CustomListItem = withStyles(theme => ({
    root: {
        paddingTop: '5px',
        paddingBottom: '5px'
    },
    selected: {
        borderLeft: 'rgb(63, 81, 181) solid',
    },
}))(ListItem);
class DropDownCard extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(state) {
        const { handleOpen, task, handleStateChange } = this.props;
        handleStateChange(state)
            .then(response => {
                console.log(response);
                handleOpen(false)
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong when update state task. Please try again!');
            });
    }

    render() {
        const { classes } = this.props;
        const { handleOpen, task } = this.props;

        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Select state
                    </ListSubheader>
                }
                className={classes.root}
            >
                {TASK_STATE.map((state, i) => {
                    if (state != 'FINISH') {
                        let circleStyle = {
                            margin: 4,
                            display: "inline-block",
                            backgroundColor: 'white',
                            border: `solid 5px ${TASK_STATE_COLOR[state]}`,
                            borderRadius: "100%",
                            width: 10,
                            height: 10,
                            marginRight: '5px',
                        };
                        return (
                            <CustomListItem key={i} button selected={task.state == state} onClick={() => this.handleClick(state)}>
                                <div style={circleStyle}></div>
                                <ListItemText primary={state} />
                            </CustomListItem>
                        )
                    }
                })}
            </List>
            // <ul className="text-left">

            // </ul>
        );
    }
}
DropDownCard.propTypes = {
    classes: PropTypes.object.isRequired,
    handleOpen: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    handleStateChange: PropTypes.func.isRequired
};
export default withStyles(styles)(DropDownCard);