import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import styles from '../../assets/jss/styles/views/infomationStyle'
import { InformationForm, Avartar } from '../../components'

import { updateUser } from '../../action/auth'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Information extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const { curEmployee } = this.props;
        const { handleUpdateState } = this.props;
        return (
            <div className={classes.wrapper}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} variant="h5" component="h2">
                            Information Staff
                        </Typography>
                        <Avartar />
                        <InformationForm curEmployee={curEmployee} />
                    </CardContent>
                </Card>
            </div>
        );
    }
}
Information.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state, ownProps) => {
    return {
        curEmployee: state.auth.currentUser,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleUpdateState: (user) => dispatch(updateUser(user)),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Information));