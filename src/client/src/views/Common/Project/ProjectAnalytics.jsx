import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BarChart from '../../../components/Chart/BarChart.jsx'
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
              <BarChart/>                    
            </React.Fragment>
        );
    }
}
ProjectAnalytics.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProjectAnalytics);