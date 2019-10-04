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
                        <Paper className={classnames(classes.paper, classes.fixedHeight)}>
                            <CustomLineChart title="Chart" data={data} />
                        </Paper>
                    </Grid>
                    {/* Chart */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={classnames(classes.paper, classes.fixedHeight)}>
                            <CustomLineChart title="Chart" data={data} />
                        </Paper>
                    </Grid>
                    {/* Chart */}
                    <Grid item xs={12}>
                        <Paper className={classnames(classes.paper, classes.fixedHeight)}>
                            <CustomLineChart title="Chart" data={data} />
                        </Paper>
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