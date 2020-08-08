import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import { changeAssignee, updatePointTasks, TASK_STATE } from '../../action/task';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Task } from '../../components'

import classNames from "classnames";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const background = '#f5f8ff';
const styles = theme => ({
    title: {
        margin: '5px 0px 0px 15px',
        fontSize: '0.8em',
        fontWeight: '400',
        color: 'white',
        // '&:hover': {
        //     background: '#e6e6e6',
        // },
    },
    content: {
        display: 'flex', /* or inline-flex */
        flexDirection: 'column',
        padding: '3px 5px 0px 5px',
        backgroundColor: `${background}`
    },
    card: {
        backgroundColor: `${background}`
    },
    group_header: {
        backgroundColor: `${background}`,
        border: 'none',
        marginBottom: '5px'
    }
});

const grid = 8;
// const getListStyle = isDraggingOver => ({
//     background: isDraggingOver ? 'lightblue' : '#e6e6e6',
//     padding: '0px',
//     width: 250,
//     marginLeft: grid,
//     marginRight: grid,
//     marginBottom: '200px'
// });
const getListStyle = () => ({
    background: '#e6e6e6',
    padding: '0px',
    width: 250,
    marginLeft: grid,
    marginRight: grid,
    marginBottom: '200px'
});
const getListStyleContent = isDraggingOver => ({
    display: 'flex', /* or inline-flex */
    flexDirection: 'column',
    padding: '3px 5px 0px 5px',
    backgroundColor: isDraggingOver ? 'lightblue' : `${background}`
});

class TaskCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doTasks: [],
            doneTasks: [],
            tasks: [],
        }
    }

    render() {
        const { classes } = this.props;
        const { cardId, tasks, title } = this.props;
        console.log("[TaskCard] Render : ", tasks);
        let finishTasks = tasks.filter((task) => {
            return task.state == 'FINISH';
        });
        let doTasks = tasks.filter((task) => {
            return task.state != 'FINISH' && task.state != 'DONE';
        });
        let totalPoint = finishTasks.reduce((point, task, index, finishTasks) => {
            return point += task.point
        }, 0);
        let doneTasks = tasks.filter((task) => {
            return task.state == 'DONE';
        });
        if (this.props.filter && this.props.filter == 'DONE') {
            console.log("DoneTasks : " + JSON.stringify(doneTasks));
            return (
                <Card style={getListStyle(false)} className={classes.card}>
                    <CardHeader
                        title={
                            <div className={classes.title} >
                                {title}
                            </div>
                        } style={{
                            margin: '0px',
                            padding: '8px',
                            backgroundColor: '#3f51b5'
                        }} />
                    <CardContent className={classes.content}>
                        <ul className="list-group">
                            <li className={classNames("list-group-item", classes.group_header)}>
                                <div className="row">
                                    <div className="col-8"><a>Done task</a></div>
                                </div>
                            </li>
                            {doneTasks.map((item, index) => (
                                <Task loadTasks={this.props.loadTasks} key={item.id} task={item} index={index} openForm={this.props.openForm} mode="READONLY" />
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            );
        }
        return (

            <Card style={getListStyle()} className={classes.card}>
                <CardHeader
                    title={
                        <div className={classes.title} >
                            {title}
                        </div>
                    }
                    style={{
                        margin: '0px',
                        padding: '8px',
                        backgroundColor: '#3f51b5'
                    }} />
                <Droppable droppableId={cardId.toString()}>
                    {(provided, snapshot) => (
                        <CardContent style={getListStyleContent(snapshot.isDraggingOver)} ref={provided.innerRef}>
                            <ul className="list-group">
                                <li className={classNames("list-group-item", classes.group_header)}>
                                    <div className="row">
                                        <div className="col-7"><a>{finishTasks.length}/{tasks.length} Task</a></div>
                                        <div className="col-5"><a style={{ float: 'right' }}>{totalPoint} Point</a></div>
                                    </div>
                                </li>
                                {doTasks.map((item, index) => (
                                    <Task loadTasks={this.props.loadTasks} key={item.id} task={item} index={index} openForm={this.props.openForm} />
                                ))}
                                <li className={classNames("list-group-item", classes.group_header)}>
                                    <div className="row" style={{ height: '20px' }}>
                                        <a style={{ fontSize: '15px' }}>Completed Task</a>
                                    </div>
                                </li>
                                {finishTasks.map((item, index) => (
                                    <Task loadTasks={this.props.loadTasks} key={item.id} task={item} index={index} openForm={this.props.openForm} mode="READONLY" />
                                ))}
                            </ul>
                            {provided.placeholder}

                        </CardContent>
                    )}
                </Droppable>
            </Card>
        );
    }
}
TaskCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardId: PropTypes.number.isRequired,
    tasks: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
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
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(TaskCard)));