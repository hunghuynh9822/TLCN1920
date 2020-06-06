import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({

});
class WikiManagement extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                This webhook configuration page
            </React.Fragment>
        );
    }
}
WikiManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(WikiManagement);