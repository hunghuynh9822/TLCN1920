import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
                Hello Project Analytics                    
            </React.Fragment>
        );
    }
}
ProjectAnalytics.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProjectAnalytics);