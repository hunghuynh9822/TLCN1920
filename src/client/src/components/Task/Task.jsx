import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import { changeAssignee, updatePointTasks } from '../../action/task';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import classNames from "classnames";
import Rating from '@material-ui/lab/Rating';

const styles = theme => ({
    "checked": { "color": "orange" },
    "fa": { "fontSize": "10px" },
    "root": {
        "padding": "10px"
    }
});
const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
    // styles we need to apply on draggables
    ...draggableStyle
});

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            request: {
                taskId: '',
                employeeId: '',
                point: '',
            }
        }
    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;
        const { task, index } = this.props;
        return (
            <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}>
                        {task.title}
                    </div>
                )}
            </Draggable>
        );
    }
}

Task.propTypes = {
    classes: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
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

    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(Task)));