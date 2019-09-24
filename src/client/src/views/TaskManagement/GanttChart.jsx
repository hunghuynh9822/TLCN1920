import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Gantt } from '../../components'
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
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.gantt_container}>
                    <Gantt tasks={data} />
                </div>
            </div>
        );
    }
}
GanttChart.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(GanttChart);