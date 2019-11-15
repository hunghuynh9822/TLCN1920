import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
});
class Avartar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid container justify="center" alignItems="center">
                <Avatar alt="Remy Sharp" src="https://cdn5.vectorstock.com/i/1000x1000/23/49/new-man-avatar-icon-flat-vector-19152349.jpg" className={classes.bigAvatar} />
            </Grid>
        );
    }
}
Avartar.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Avartar);