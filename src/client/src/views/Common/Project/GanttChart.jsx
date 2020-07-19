import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

import { Alert, AlertTitle } from '@material-ui/lab';

import { Gantt, Toolbar, MessageArea, Loading } from '../../../components';
import { getTasksOfProject, updateTask, TASK_STATE } from '../../../action/task';
import { reloadTasks } from '../../../action/task';
const styles = theme => ({
    gantt_container: { "height": "calc(100vh - 40px - 200px)" },
    zoom_bar: { background: "#ededed", height: "40px", lineHeight: "40px", padding: "5px 10px" }
});
class GanttChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentZoom: 'Days',
            messages: [],
            loading: false,
            currentIndex: 0,
        }
        this.loadTasks = this.loadTasks.bind(this);
        this.reloadTaskMessage = this.reloadTaskMessage.bind(this);
        this.renderMessage = this.renderMessage.bind(this);
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

    reloadTaskMessage() {
        const { alert } = this.props;
        const { projectItem } = this.props;
        let projectId = projectItem.project.id;
        getTasksOfProject(projectId)
            .then(response => {
                let message = response.message;
                let tasks = response.tasks;
                let criticalPath = response.listGantt;
                let data = tasks.map((task) => {
                    return {
                        id: task.id,
                        text: task.title,
                        start_date: this.convertDateToString(task.startedAt),
                        duration: task.duration == null ? 0 : task.duration,
                        progress: task.process,
                        type: criticalPath.includes(task.id) ? gantt.config.types.critical : null
                    }
                })
                data.message = message;
                data.links = response.links
                // this.setState({
                //     data: data,
                // })
                console.log("[Gantt] reloadTaskMessage ", { data: data, links: response.links, message: message })
                this.props.reloadGanttTasks({ data: data, links: response.links, message: message });
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong when get tasks of project. Please call check!');
            });
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
                let criticalPath = response.listGantt;
                let data = tasks.map((task) => {
                    return {
                        id: task.id,
                        text: task.title,
                        start_date: this.convertDateToString(task.startedAt),
                        duration: task.duration == null ? 0 : task.duration,
                        progress: task.process,
                        type: criticalPath.includes(task.id) ? gantt.config.types.critical : null
                    }
                })
                let message = response.message;
                console.log("[Gantt] loadTasks ", { data: data, links: response.links, message: message })
                this.props.reloadGanttTasks({ data: data, links: response.links, message: message });
                this.setState({
                    // data: { data: data, links: response.links, message: message },
                    loading: false
                })
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong when get tasks of project. Please call check!');
                this.setState({
                    loading: false
                })
            });
    }

    componentDidMount() {
        this.loadTasks();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index == 2 && this.state.currentIndex != nextProps.index) {
            this.loadTasks();
        }
        this.setState({
            currentIndex: nextProps.index
        })
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
    /**
     * link
     * create
     * 0 : FS
     * 1 : SS
     * 2 : FF
     * 3 : SF
     */
    logDataUpdate = (entityType, action, itemData, id) => {
        let text = itemData && itemData.text ? ` (${itemData.text})` : '';
        let message = `${entityType} ${action}: ${id} ${text}`;
        //
        const { projectItem } = this.props;
        let tasks = projectItem.tasks;
        console.log("[Gantt] Data change ", entityType, action, itemData, id);

        let request = {};
        //Update link -> apply on target
        if (entityType === 'link') {

            const sourceTask = tasks.find(element => element.id == itemData.source);
            console.log("[Gantt] Change task source " + JSON.stringify(sourceTask));
            const targetTask = tasks.find(element => element.id == itemData.target);
            console.log("[Gantt] Change task target " + JSON.stringify(targetTask));
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
                if (itemData.type === "0") {
                    message += ` ( source: ${itemData.source}, target: ${itemData.target} )`;
                    if (preTaskId == undefined || preTaskId == null || preTaskId == "") {
                        preTaskId = "" + sourceTask.id;
                    } else {
                        preTaskId = preTaskId + "," + sourceTask.id;
                    }
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

            console.log("[Gantt][UpdateTask][Link] Request : " + JSON.stringify(request));
            updateTask(request)
                .then(response => {
                    console.log(response);
                    this.loadTasks();
                    // this.reloadTaskMessage();
                }).catch(error => {
                    console.log(error);
                    //(error && error.message) || 
                    alert.error('Oops! Something went wrong on [UpdateTask][Link] with Gantt Chart. Please call check!');
                });
        } else if (entityType === 'task') {
            if (action === 'update') {
                let task = tasks.find(element => element.id == itemData.id);
                request = {
                    taskId: task.id,
                    employeeId: task.employeeAssignee,
                    title: itemData.text,
                    description: task.description,
                    point: task.point,
                    state: TASK_STATE.indexOf(task.state),
                    startedAt: Date.parse(itemData.start_date),
                    duration: itemData.duration,
                    preTaskId: task.preTaskId
                }
                console.log("[Gantt][UpdateTask][Task] Request : " + JSON.stringify(request));
                updateTask(request)
                    .then(response => {
                        console.log(response);
                        this.loadTasks();
                        // this.reloadTaskMessage();
                    }).catch(error => {
                        console.log(error);
                        //(error && error.message) || 
                        alert.error('Oops! Something went wrong on [UpdateTask][Task] with Gantt Chart. Please call check!');
                    });
            } else {
                console.log("[Gantt] Unsupport action " + action);
            }
        } else {
            console.log("[Gantt] Unsupport type " + entityType);
        }
        //
        this.addMessage(message);
    }

    handleZoomChange = (zoom) => {
        this.setState({
            currentZoom: zoom
        });
    }

    renderMessage() {
        return this.props.ganttTasks && this.props.ganttTasks.message && this.props.ganttTasks.message.map((value, index) => {
            let params = value.params;
            let message = value.message;
            params.forEach((value, index) => {
                message = message.replace('{{' + index + '}}', '<strong className\"match\">' + value + '</strong>')
            })
            return (
                <Alert key={index} severity="warning">
                    <span dangerouslySetInnerHTML={{ __html: message }} />
                </Alert>
            )
        })
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
                <div>
                    {this.renderMessage()}
                </div>
                <div className={classes.zoom_bar}>
                    <Toolbar
                        zoom={currentZoom}
                        onZoomChange={this.handleZoomChange}
                    />
                </div>
                <div className={classes.gantt_container}>
                    <Gantt
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
const mapStateToProps = (state, ownProps) => {
    return {
        ganttTasks: state.tasks.ganttTasks,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        reloadGanttTasks: (ganttTasks) => dispatch(reloadTasks(ganttTasks)),
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(GanttChart)));