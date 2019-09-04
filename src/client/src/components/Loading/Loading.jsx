import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactDelayRender from 'react-delay-render';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const ColorCircularProgress = withStyles({
    root: {
        color: 'rgba(0, 116, 194, 0.66)',
    },
})(CircularProgress);

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '100vh',
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
