import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { reloadTasks } from '../../action/task';
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
                const { ganttTasks } = this.props;
                if (onDataUpdated) {
                    onDataUpdated(type, action, item, id);
                    gantt.refreshData();
                    console.log("[Gantt] render ", ganttTasks, gantt);
                }

                // if onDataUpdated changes returns a permanent id of the created item, you can return it from here so dhtmlxGantt could apply it
                // resolve({id: databaseId});
                return resolve(ganttTasks);
            });
        });
    }

    shouldComponentUpdate(nextProps) {
        console.log("[Gantt] shouldComponentUpdate", this.props.zoom !== nextProps.zoom, nextProps)
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
        const { ganttTasks } = this.props;
        count = count + 1;
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        //
        gantt.config.types.critical = "critical";
        gantt.locale.labels.type_critical = "Meeting";
        gantt.config.lightbox.critical_sections = [
            { name: "title", height: 20, map_to: "text", type: "textarea", focus: true },
            { name: "details", height: 70, map_to: "details", type: "textarea" },
            { name: "type", type: "typeselect", map_to: "type" },
            { name: "time", height: 72, type: "time", map_to: "auto" }
        ];
        gantt.locale.labels.section_title = "Subject";
        gantt.locale.labels.section_details = "Details";
        gantt.templates.task_class = function (start, end, task) {
            if (task.type == gantt.config.types.critical) {
                return "critical_class";
            }
            return "";
        };
        gantt.templates.task_text = function (start, end, task) {
            if (task.type == gantt.config.types.critical) {
                return "Critical: <b>" + task.text + "</b>";
            }
            return task.text;
        };
        //
        // gantt.config.work_time = true;
        // gantt.config.correct_work_time = true;
        gantt.config.drag_progress = false;
        gantt.config.drag_links = false;
        //
        // default columns definition
        gantt.config.columns = [
            { name: "text", label: "Task name", tree: true, width: '*' },
            { name: "start_date", label: "Start time", align: "center" },
            { name: "duration", label: "Duration", align: "center" },
        ];
        //
        console.log("[Gantt] componentDidMount with tasks " + JSON.stringify(ganttTasks), this.props);
        gantt.init(this.ganttContainer);
        this.initGanttDataProcessor();
        gantt.parse(ganttTasks);
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
export default connect(mapStateToProps, mapDispatchToProps)(Gantt);