import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
                            
});
class ProjectDetails extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const { projectId } = this.props;
        return (
            <React.Fragment>
                Hello Project Details              
            </React.Fragment>
        );
    }
}
ProjectDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProjectDetails);