import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
var count = 1;
class Gantt extends Component {
    // instance of gantt.dataProcessor
    dataProcessor = null;

    constructor(props) {
        super(props);
    }

    setZoom(value) {
        switch (value) {
            case 'Hours':
                gantt.config.scale_unit = 'day';
                gantt.config.date_scale = '%d %M';

                gantt.config.scale_height = 60;
                gantt.config.min_column_width = 30;
                gantt.config.subscales = [
                    { unit: 'hour', step: 1, date: '%H' }
                ];
                break;
            case 'Days':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = 'week';
                gantt.config.date_scale = '#%W';
                gantt.config.subscales = [
                    { unit: 'day', step: 1, date: '%d %M' }
                ];
                gantt.config.scale_height = 60;
                break;
            case 'Months':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = 'month';
                gantt.config.date_scale = '%F';
                gantt.config.scale_height = 60;
                gantt.config.subscales = [
                    { unit: 'week', step: 1, date: '#%W' }
                ];
                break;
            default:
                break;
        }
    }

    initGanttDataProcessor() {
        /**
         * type: "task"|"link"
         * action: "create"|"update"|"delete"
         * item: data object object
         */
        const onDataUpdated = this.props.onDataUpdated;
        console.log("[Gantt] initGanttDataProcessor");
        this.dataProcessor = gantt.createDataProcessor((type, action, item, id) => {
            return new Promise((resolve, reject) => {
                if (onDataUpdated) {
                    onDataUpdated(type, action, item, id);
                }

                // if onDataUpdated changes returns a permanent id of the created item, you can return it from here so dhtmlxGantt could apply it
                // resolve({id: databaseId});
                return resolve();
            });
        });
    }

    shouldComponentUpdate(nextProps) {
        console.log("[Gantt] shouldComponentUpdate")
        return this.props.zoom !== nextProps.zoom;
    }

    componentDidUpdate() {
        console.log("[Gantt] componentDidUpdate")
        gantt.render();
    }

    componentWillUnmount() {
        console.log("[Gantt] componentWillUnmount")
        gantt.clearAll();
        if (this.dataProcessor) {
            this.dataProcessor.destructor();
            this.dataProcessor = null;
            console.log("[Gantt] componentWillUnmount -> destructor")
        }
    }

    componentDidMount() {
        count = count + 1;
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        const { tasks } = this.props;
        console.log("[Gantt] componentDidMount with tasks " + JSON.stringify(tasks));
        gantt.init(this.ganttContainer);
        this.initGanttDataProcessor();
        gantt.parse(tasks);
        gantt.render();
    }

    render() {
        const { zoom } = this.props;
        this.setZoom(zoom);
        return (
            <div key="gantt" ref={(input) => { this.ganttContainer = input }}
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
}
export default Gantt;