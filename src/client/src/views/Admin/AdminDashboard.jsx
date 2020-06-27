import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/styles/views/adminDashboardStyle';
import classnames from 'classnames';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { CustomLineChart } from '../../components';
import PieChart from '../../components/Chart/PieChart.jsx'
import BarChartNgang from '../../components/Chart/BarChartNgang.jsx'
import DrilldownChart from '../../components/Chart/DrilldownChart.jsx';
// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined),
];

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3} className={classes.gridroot}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <DrilldownChart />
                        {/* <BarChartNgang /> */}
                        {/* <Drilldown /> */}
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
AdminDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AdminDashboard);