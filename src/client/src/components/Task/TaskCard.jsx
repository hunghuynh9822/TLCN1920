import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import { changeAssignee, updatePointTasks, TASK_STATE } from '../../action/task';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Task } from '../../components'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    title: {
        margin: '12px 0px 0px 15px',
        fontSize: '1em',
        fontWeight: '400',
        color: '#464c59',
        '&:hover': {
            background: '#e6e6e6',
        },
    },
    content: {
        display: 'flex', /* or inline-flex */
        flexDirection: 'column',
    }
});

const grid = 8;
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250,
    marginLeft: grid,
    marginRight: grid,
});

class TaskCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doTasks: [],
            doneTasks: []
        }
    }

    render() {
        const { classes } = this.props;
        const { cardId, tasks, title } = this.props;
        console.log("TaskCard : " + JSON.stringify(tasks));
        let doneTasks = tasks.filter((task) => {
            return task.state == 'FINISH';
        });
        let doTasks = tasks.filter((task) => {
            return task.state != 'FINISH';
        });
        let totalPoint = doneTasks.reduce((point, task, index, doneTasks) => {
            return point += task.point
        }, 0);
        return (
            <Droppable droppableId={cardId.toString()}>
                {(provided, snapshot) => (
                    <Card style={getListStyle(snapshot.isDraggingOver)} className={classes.card} ref={provided.innerRef}>
                        <CardHeader
                            title={
                                <div className={classes.title} >
                                    {title}
                                </div>
                            } />
                        <CardContent className={classes.content}>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-8"><a>{doneTasks.length}/{tasks.length} Task With Point</a></div>
                                        <div className="col-4"><a style={{ float: 'right' }}>{totalPoint} Point</a></div>
                                    </div>
                                </li>
                                {doTasks.map((item, index) => (
                                    <Task key={item.id} task={item} index={index} />
                                ))}
                                <li className="list-group-item ">
                                    <div className="row" style={{ height: '6px' }}>
                                        <a style={{ fontSize: '12px' }}>Completed Task</a>
                                    </div>
                                </li>
                                {doneTasks.map((item, index) => (
                                    <Task key={item.id} task={item} index={index} />
                                ))}
                            </ul>
                            {provided.placeholder}
                        </CardContent>
                    </Card>
                )}
            </Droppable>
        );
    }
}
TaskCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardId: PropTypes.number.isRequired,
    tasks: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
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