import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Gantt, Toolbar, MessageArea } from '../../components'
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
        let projectId = this.props.match.params.projectId;
        console.log("Timeline of projectId : " + projectId);
        if (projectId === 'project') {
            return (
                <div>No project selected</div>
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
                        tasks={data}
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
export default withStyles(styles)(GanttChart);