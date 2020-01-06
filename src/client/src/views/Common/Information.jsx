import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import styles from '../../assets/jss/styles/views/infomationStyle'
import Avatar from 'react-avatar';
import { InformationForm } from '../../components'

import { updateUser } from '../../action/auth'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { getCurrentUser } from '../../action/auth'

class Information extends Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate() {
        const { handleUpdateEmployeeGobal } = this.props;
        getCurrentUser()
            .then(response => {
                console.log("Updated employee");
                console.log(response);
                handleUpdateEmployeeGobal(response);
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        const { classes } = this.props;
        const { curEmployee } = this.props;
        const { handleUpdate } = this.props;
        return (
            <div className={classes.wrapper}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} variant="h5" component="h2">
                            Information Staff
                        </Typography>
                        <div style={{textAlign: 'center'}}>
                            {curEmployee.imageUrl ? (
                                <Avatar src={curEmployee.imageUrl} round="25px" size="50" />
                            ) : (
                                    <Avatar name={curEmployee.lastName + " " + curEmployee.firstName} round="25px" size="50" />
                                )}
                        </div>
                        <InformationForm curEmployee={curEmployee} handleUpdate={this.handleUpdate} />
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
        handleUpdateEmployeeGobal: (user) => dispatch(updateUser(user)),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Information));