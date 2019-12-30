import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import { changeAssignee, updatePointTasks } from '../../action/task';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import classNames from "classnames";
import Rating from '@material-ui/lab/Rating';

const StyledRating = withStyles({
    iconFilled: {
        color: '#3d55d1',
    },
    iconHover: {
        color: '#5b73eb',
    },
})(Rating);

function getLabelText(value) {
    return `${value} Heart${value !== 1 ? 's' : ''}`;
}

import StarBorderIcon from '@material-ui/icons/StarBorder';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
    margin: `0 0 5px 0`,
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',
    display: 'flex',
    lineHeight: '40px',
    justifyContent: 'space-between',
    padding: '10px 8px',
    // styles we need to apply on draggables
    ...draggableStyle,
});

const _dragEl = document.getElementById('draggable');

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
        this.handleOpen = this.handleOpen.bind(this);
    }

    optionalPortal(styles, element) {
        if (styles.position === 'fixed') {
            return createPortal(
                element,
                _dragEl,
            );
        }
        return element;
    }

    componentDidMount() {

    }

    handleOpen() {
        console.log("Open")
        this.props.openForm(this.props.task);
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
                    <div onClick={this.handleOpen}>
                        {this.optionalPortal(provided.draggableProps.style, (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}
                            >
                                <div>
                                    {task.title}
                                </div>
                                <div>
                                    <StyledRating
                                        name="customized-color"
                                        value={0}
                                        getLabelText={getLabelText}
                                        precision={0.5}
                                        icon={<FiberManualRecordIcon fontSize="small" />}
                                        readOnly
                                    />
                                </div>
                            </div>
                        ))}
                        {provided.placeholder}
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
    openForm: PropTypes.func.isRequired,
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