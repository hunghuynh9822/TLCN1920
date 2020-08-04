import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import { changeAssignee, updatePointTasks, TASK_STATE_COLOR, TASK_STATE, updateStateTasks } from '../../action/task';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { ButtonDropdown } from '../../components';

import classNames from "classnames";
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Avatar from 'react-avatar';

//
import sad from '../../assets/img/sad.png';
import angry from '../../assets/img/angry.png';
import confused from '../../assets/img/confused.png';
import smiling from '../../assets/img/smiling.png';
import happy from '../../assets/img/happy.png';
import question from '../../assets/img/question.png';
import deadline from '../../assets/img/deadline.png';


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
    },
    icon_rate: {
        marginTop: '6px',
        width: '25px',
        height: '25px',
        marginLeft: '6px'
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

const mapRate = {
    1: angry,
    2: sad,
    3: confused,
    4: smiling,
    5: happy
}

const month = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
}
class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: undefined,
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
        this.getMember = this.getMember.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    getMember(memberId) {
        const { projectItem } = this.props;
        let members = projectItem.members;
        let result = members.filter((member) => {
            // console.log("getMember : compare " + member.id + " - " + memberId);
            return member.id == memberId;
        })[0];
        // console.log("getMember : " + JSON.stringify(result));
        return result;
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
        this.setState({
            task: this.props.task
        })
    }

    componentWillReceiveProps(nextProps) {
        const { task } = nextProps;
        console.log("[Task] componentWillReceiveProps task : ", task)
        this.setState({
            task: task
        })
    }

    handleOpen() {
        console.log("Open")
        this.props.openForm(this.state.task);
    }

    getColor(state) {
        return TASK_STATE_COLOR[state];
    }

    renderIcon(point) {
        const { classes } = this.props;
        if (point != null && point != 0) {
            return (<img className={classes.icon_rate} src={mapRate[point]} alt="Rate" />)
        }
    }

    handleStateChange(state) {
        const { alert } = this.props;
        const { currentUser, projectItem } = this.props;
        this.setState({
            task: { ...this.state.task, state: state }
        });
        let request = {
            taskId: this.state.task.id,
            employeeId: currentUser.id,
            state: TASK_STATE.indexOf(state),
            projectId: projectItem.project.id
        }
        console.log("Request update state task : " + JSON.stringify(request));
        return updateStateTasks(request)
            .then(response => {
                console.log(response);
                this.props.loadTasks();
                return response;
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong when update state task. Please try again!');
            });
    }

    renderState(task, mode) {
        const { classes } = this.props;
        // console.log("[Task] ", task)
        return (
            <div style={{ borderTop: '1px solid #d0d3d9', paddingTop: '5px', height: '35px' }}>
                <div style={{ float: 'left' }}>
                    {mode === 'READONLY' ? (
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
                    ) : (
                            <ButtonDropdown task={task} handleStateChange={this.handleStateChange} name={task.state} colorWord={colorWord} backgroundColor={this.getColor(task.state)}></ButtonDropdown>
                        )}
                </div>
                <div style={{ float: 'left' }}>
                    {this.checkDealine(task)}
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

    getName(employee) {
        return employee == undefined ? "?" : employee.lastName + " " + employee.firstName;
    }

    renderDateString(date) {
        return date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
    }

    checkDealine(task) {
        const { classes } = this.props;
        if (task.state != "DONE" && task.state != "FINISH") {
            let end = new Date(task.startedAt + (1000 * 60 * 60 * 24) * task.duration);
            let current = new Date();
            if (current > end) {
                return (<img className={classes.icon_rate} src={deadline} alt="Deadline" />)
            }
        }
    }

    truncate(str, n, useWordBoundary) {
        if (str.length <= n) { return str; }
        const subString = str.substr(0, n - 1); // the original check
        return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(" "))
            : subString) + " ...";
    };

    renderTitle(task) {
        const { classes } = this.props;
        let creator = this.getMember(task.employeeCreator);
        let start = new Date(task.startedAt);
        let end = new Date(task.startedAt + (1000 * 60 * 60 * 24) * task.duration);
        // console.log("[Task] Data ", task)
        return (
            <div className={classes.title} onClick={this.handleOpen}>
                <div style={{ float: 'left' }}>
                    {this.truncate(task.title, 25, true)}
                    <div style={{ fontSize: '10px' }}>
                        {this.renderDateString(start)} - {this.renderDateString(end)}
                    </div>
                </div>
                <div style={{ float: 'right', marginRight: '14px' }}>
                    {creator && creator.imageUrl ? (
                        <Avatar src={creator.imageUrl} round="20px" size="25" />
                    ) : (
                            <Avatar name={this.getName(creator)} round="20px" size="25" />
                        )
                    }
                </div>
            </div>
        )
    }

    render() {
        const { classes } = this.props;
        const { index } = this.props;
        const { task } = this.state;
        if (task) {
            if (this.props.mode && this.props.mode === 'READONLY') {
                return (
                    <div>
                        <div
                            style={getItemStyle(
                                false, {}
                            )}
                        >
                            {this.renderTitle(task)}
                            {this.renderState(task, this.props.mode)}
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
                        <div>
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
                                    {this.renderTitle(task)}
                                    {this.renderState(task, this.props.mode)}

                                </div>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Draggable>
            );
        }
        return null
    }
}

Task.propTypes = {
    classes: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    openForm: PropTypes.func.isRequired,
    loadTasks: PropTypes.func.isRequired,
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