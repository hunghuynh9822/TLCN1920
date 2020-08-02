import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import login_task_3 from '../../assets/img/login_task_3.png';
import login_task_4 from '../../assets/img/login_task_4.jpg';
import { Copyright } from '../../components'

const styles = theme => ({
    background_1: {
        position: 'absolute',
        background: `url(${login_task_3}) no-repeat`,
        width: '1000px',
        height: '700px',
        bottom: 0,
        right: 0,
        zIndex: -1,
        opacity: '0.5'
    },
    background_2: {
        position: 'absolute',
        background: `url(${login_task_4}) no-repeat`,
        width: '1000px',
        height: '700px',
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: '0.5'
    },
    copy_right: {
        width: '100%',
        position: 'absolute',
        bottom: '30px',
        left: 0
    }
});
class Background extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.background_1}></div>
                {/* <div className={classes.background_2}></div> */}
                <div className={classes.copy_right}><Copyright /></div>
            </React.Fragment>
        );
    }
}
Background.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Background);