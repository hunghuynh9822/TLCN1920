import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAlert } from 'react-alert';

import { Gantt, Toolbar, MessageArea, Loading } from '../../../components';
import { getTasksOfProject, updateTask, TASK_STATE } from '../../../action/task';
const styles = theme => ({
    gantt_container: { "height": "calc(100vh - 40px - 200px)" },
    zoom_bar: { background: "#ededed", height: "40px", lineHeight: "40px", padding: "5px 10px" }
});
const data = {
    data: [
        { id: 1, text: 'Task #1', start_date: '2020/01/15', duration: 3, progress: 0.6 },
        { id: 2, text: 'Task #2', start_date: '2020/01/18', duration: 3, progress: 0.0 },
        { id: 3, text: 'Task #3', start_date: '2020/01/15', duration: 5, progress: 0.4 },
        { id: 4, text: 'Task #4', start_date: '2020/01/20', duration: 3, progress: 0.0 },
        { id: 5, text: 'Task #5', start_date: '2020/01/17', duration: 2, progress: 0.5 },
        { id: 6, text: 'Task #6', start_date: '2020/01/19', duration: 3, progress: 0.0 },
        { id: 7, text: 'Task #7', start_date: '2020/01/22', duration: 5, progress: 0.0 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '0' },
        { id: 2, source: 3, target: 4, type: '0' },
        { id: 3, source: 5, target: 6, type: '0' },
        { id: 4, source: 6, target: 7, type: '0' }
    ]
};
class GanttChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentZoom: 'Days',
            messages: [],
            data: {
                data: [],
                links: []
            },
            loading: false,
        }
        this.loadTasks = this.loadTasks.bind(this);
    }

    convertDateToString(milisecond) {
        var date = new Date(milisecond);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var result = yyyy + '/' + mm + '/' + dd;
        return result;
    }

    loadTasks() {
        this.setState({
            loading: true
        })
        const { alert } = this.props;
        const { projectItem } = this.props;
        let projectId = projectItem.project.id;
        getTasksOfProject(projectId)
            .then(response => {
                let tasks = response.tasks;
                let data = tasks.map((task) => {
                    return {
                        id: task.id,
                        text: task.title,
                        start_date: this.convertDateToString(task.startedAt),
                        duration: task.duration == null ? 0 : task.duration,
                        progress: task.process
                    }
                })
                this.setState({
                    data: { data: data, links: response.links },
                    loading: false
                })
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong. Please try again!');
                this.setState({
                    loading: false
                })
            });
    }

    componentDidMount() {
        this.loadTasks();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index == 2) {
            this.loadTasks();
        }
    }

    addMessage(message) {
        const maxLogLength = 5;
        const newMessate = { message };
        const messages = [
            newMessate,
            ...this.state.messages
        ];

        if (messages.length > maxLogLength) {
            messages.length = maxLogLength;
        }
        this.setState({ messages });
    }

    /**
     * 
     */

    /**
     * type, action, item, id
         * type: "task"|"link"
         * action: "create"|"update"|"delete"
         * item: data object object
         */
    logDataUpdate = (entityType, action, itemData, id) => {
        let text = itemData && itemData.text ? ` (${itemData.text})` : '';
        let message = `${entityType} ${action}: ${id} ${text}`;
        //
        const { projectItem } = this.props;
        let tasks = projectItem.tasks;
        console.log("[Gantt] Data change ", entityType, action, itemData, id);
        const sourceTask = tasks.find(element => element.id == itemData.source);
        console.log("[Gantt] Change task source " + JSON.stringify(sourceTask));
        //{"id":15782717407117,"projectId":15776774274194,"employeeCreator":15751881480165,"employeeAssignee":15782398324826,"title":"Thiết kế biểu mẫu","description":"Chỉ tiết các form có thể xuất hiện ","startedAt":1575420420000,"duration":4,"state":"NEW","point":0,"createdAt":1578271740711,"updatedAt":1591425813387,"process":0}
        const targetTask = tasks.find(element => element.id == itemData.target);
        console.log("[Gantt] Change task target " + JSON.stringify(targetTask));
        let request = {};
        //Update link -> apply on target
        if (entityType === 'link') {
            request = {
                taskId: targetTask.id,
                employeeId: targetTask.employeeAssignee,
                title: targetTask.title,
                description: targetTask.description,
                point: targetTask.point,
                state: TASK_STATE.indexOf(targetTask.state),
                startedAt: targetTask.startedAt,
                duration: targetTask.duration,
                preTaskId: targetTask.preTaskId
            }
            let preTaskId = request.preTaskId;
            if (action === 'create') {
                message += ` ( source: ${itemData.source}, target: ${itemData.target} )`;
                if (preTaskId == undefined || preTaskId == null || preTaskId == "") {
                    preTaskId = "" + sourceTask.id;
                } else {
                    preTaskId = preTaskId + "," + sourceTask.id;
                }
            } else if (action === 'delete') {
                if (preTaskId != null && preTaskId != "") {
                    let preTaskIds = preTaskId.split(",");
                    preTaskId = "";
                    preTaskIds.forEach((task, index) => {
                        if (task != sourceTask.id) {
                            if (index === preTaskIds.length - 1) {
                                preTaskId = preTaskId + task;
                            } else {
                                preTaskId = preTaskId + task + ","
                            }
                        }
                    })
                }
            }
            request.preTaskId = preTaskId;

            console.log("[UpdateTask][Link] Request : " + JSON.stringify(request));
            updateTask(request)
                .then(response => {
                    console.log(response);
                    // this.loadTasks();
                }).catch(error => {
                    console.log(error);
                    //(error && error.message) || 
                    alert.error('Oops! Something went wrong. Please try again!');
                });
        }

        //



        this.addMessage(message);

    }

    handleZoomChange = (zoom) => {
        this.setState({
            currentZoom: zoom
        });
    }
    render() {
        const { classes } = this.props;
        const { currentZoom, messages } = this.state;
        const { projectItem } = this.props;
        let projectId = projectItem.project.id;
        console.log("Timeline of projectId : " + projectId);
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        return (
            <div>
                <div className={classes.zoom_bar}>
                    <Toolbar
                        zoom={currentZoom}
                        onZoomChange={this.handleZoomChange}
                    />
                </div>
                <div className={classes.gantt_container}>
                    <Gantt
                        tasks={this.state.data}
                        zoom={currentZoom}
                        onDataUpdated={this.logDataUpdate}
                    />
                </div>
                <MessageArea
                    messages={messages}
                />
            </div>
        );
    }
}
GanttChart.propTypes = {
    classes: PropTypes.object.isRequired,
    projectItem: PropTypes.object.isRequired,
};
export default withStyles(styles)(withAlert()(GanttChart));