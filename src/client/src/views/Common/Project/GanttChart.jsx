import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Gantt, Toolbar, MessageArea } from '../../../components';
const styles = theme => ({
    gantt_container: { "height": "calc(100vh - 40px - 200px)" }
});
const data = {
    data: [
        { id: 1, text: 'Task #1', start_date: '2019/04/15', duration: 3, progress: 0.6 },
        { id: 2, text: 'Task #2', start_date: '2019/04/18', duration: 3, progress: 0.4 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '0' }
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
        const { projectId } = this.props;
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