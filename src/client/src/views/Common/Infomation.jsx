import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/styles/views/infomationStyle'
class Infomation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                Information
            </React.Fragment>
        );
    }
}
Infomation.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Infomation);