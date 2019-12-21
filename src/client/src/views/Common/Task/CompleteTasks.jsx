import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({

});
class CompleteTasks extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                This is complete task show here
            </React.Fragment>
        );
    }
}
CompleteTasks.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CompleteTasks);