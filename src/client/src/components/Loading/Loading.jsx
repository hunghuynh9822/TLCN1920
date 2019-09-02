import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactDelayRender from 'react-delay-render';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const ColorCircularProgress = withStyles({
    root: {
        color: 'red',
    },
})(CircularProgress);

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class Loading extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ColorCircularProgress size={90} thickness={3} disableShrink />
            </div>
        )
    }
}
Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default ReactDelayRender({ delay: 0 })(withStyles(styles)(Loading));
