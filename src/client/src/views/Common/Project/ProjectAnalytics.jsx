import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PieChart from '../../../components/Chart/PieChart.jsx'
import PieBarChart from '../../../components/Chart/PieBarChart.jsx'
import BarChartNgang from '../../../components/Chart/BarChartNgang.jsx'
const styles = theme => ({
                            
});
class ProjectAnalytics extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const { projectId } = this.props;
        return (
            <React.Fragment>
              <PieChart/> 
              <BarChartNgang/>      
              <PieBarChart/>             
            </React.Fragment>
        );
    }
}
ProjectAnalytics.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProjectAnalytics);