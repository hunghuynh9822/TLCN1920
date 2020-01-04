import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAlert } from 'react-alert';

import { Gantt, Toolbar, MessageArea, Loading} from '../../../components';
import { getTasksOfProject } from '../../../action/task';
const styles = theme => ({
    gantt_container: { "height": "calc(100vh - 40px - 200px)" }
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
                        id: task.id, text: task.title, start_date: this.convertDateToString(task.startedAt), duration: task.duration == null ? 0 : task.duration, progress: 0.6
                    }
                })
                this.setState({
                    data: { data: data, links: [] },
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

    logDataUpdate = (entityType, action, itemData, id) => {
        console.log("Data change");
        let text = itemData && itemData.text ? ` (${itemData.text})` : '';
        let message = `${entityType} ${action}: ${id} ${text}`;
        if (entityType === 'link' && action !== 'delete') {
            message += ` ( source: ${itemData.source}, target: ${itemData.target} )`;
        }
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
        console.log("TASK OF PROJECT : " + JSON.stringify(this.state.data))
        if(this.state.loading) {
            return (
                <Loading />
            )
        }
        return (
            <div>
                <div className="zoom-bar">
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
};
export default withStyles(styles)(withAlert()(GanttChart));