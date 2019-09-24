import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
var count = 1;
class Gantt extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("Did mount" + count);
        count = count + 1;
        console.log(this.ganttContainer);
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        const { tasks } = this.props;
        gantt.init(this.ganttContainer);
        console.log(tasks);
        gantt.parse(tasks);
    }
    render() {
        return (
            <div key="gantt" ref={(input) => { this.ganttContainer = input }}
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
}
export default Gantt;