import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({

})
class TabPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        const { children, value, index, ...other } = this.props;
        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {children}
            </Typography>
        );
    }
}
TabPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
export default withStyles(styles)(TabPanel);