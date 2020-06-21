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
import Button from '@material-ui/core/Button';

//
import sad from '../../assets/img/sad.png';
import angry from '../../assets/img/angry.png';
import confused from '../../assets/img/confused.png';
import smiling from '../../assets/img/smiling.png';
import happy from '../../assets/img/happy.png';
import question from '../../assets/img/question.png';


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
    },
    title: {
        fontSize: '15px',
        minWidth: '130px',
        width: '200px'
    },
    icon_rate: {
        marginTop: '3px',
        width: '25px',
        height: '25px'
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
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '#d4e1ff 0px 0px 5px 2px',
    // styles we need to apply on draggables
    ...draggableStyle,
});

const _dragEl = document.getElementById('draggable');

const colorWord = "#ffffff";
const mapColor = {
    "NEW": "#0ac400",
    "DEVELOPING": "#e69900",
    "DEVELOPED": "#00d8db",
    "TESTING": "#ff0000",
    "DONE": "#0026ff",
    "FINISH": "#0026ff"
}

const mapRate = {
    1: angry,
    2: sad,
    3: confused,
    4: smiling,
    5: happy
}

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
        this.renderState = this.renderState.bind(this);
        this.renderIcon = this.renderIcon.bind(this);
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

    getColor(state) {
        return mapColor[state];
    }

    renderIcon(point) {
        const { classes } = this.props;
        if (point != null && point != 0) {
            return (<img className={classes.icon_rate} src={mapRate[point]} alt="Rate" />)
        }
    }

    renderState(task) {
        const { classes } = this.props;
        // console.log("[Task] ", task)
        return (
            <div style={{ borderTop: '1px solid #d0d3d9', paddingTop: '5px' }}>
                <div style={{ float: 'left' }}>
                    <Button disabled variant="outlined" size="small" color="primary" style={{
                        alignSelf: 'flex-start',
                        borderStyle: 'dashed',
                        fontSize: '0.6em',
                        marginBottom: '8px',
                        opacity: '0.7',
                        color: `${colorWord}`,
                        backgroundColor: `${this.getColor(task.state)}`
                    }}>
                        {task.state}
                    </Button>
                </div>
                <div style={{ float: 'right', marginRight: '14px' }}>
                    {this.renderIcon(task.point)}
                    {/* <StyledRating
                        name="customized-color"
                        value={task.point}
                        getLabelText={getLabelText}
                        precision={0.5}
                        icon={<FiberManualRecordIcon fontSize="small" style={{ fontSize: 15 }} />}
                        readOnly
                    /> */}
                </div>
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        const { task, index } = this.props;
        if (this.props.mode && this.props.mode === 'READONLY') {
            return (
                <div onClick={this.handleOpen}>
                    <div
                        style={getItemStyle(
                            false, {}
                        )}
                    >
                        <div className={classes.title}>
                            {task.title}
                        </div>
                        {this.renderState(task)}
                    </div>
                </div>
            )
        }
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
                                <div className={classes.title}>
                                    {task.title}
                                </div>
                                {this.renderState(task)}
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