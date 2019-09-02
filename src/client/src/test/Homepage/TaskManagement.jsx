import React, { Component } from 'react';
import TaskContainer from './TaskContainer';
import Task from './Task'

class TaskManage extends Component {
    render() {
        return (
            <React.Fragment>
                <TaskContainer>
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </TaskContainer>
            </React.Fragment>
        );
    }
}

export default TaskManage;