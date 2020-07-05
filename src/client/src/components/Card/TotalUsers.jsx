import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
//
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
//
const styles = theme => ({
    root: {
        height: 'auto'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.success.main,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: theme.palette.success.dark
    },
    differenceValue: {
        color: theme.palette.success.dark,
        marginRight: theme.spacing(1)
    }
});
class TotalUsers extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { className, classes, ...rest } = this.props;
        return (
            <Card
                {...rest}
                className={classnames(classes.root, className)}
            >
                <CardContent>
                    <Grid
                        container
                        justify="space-between"
                    >
                        <Grid item>
                            <Typography
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                {this.props.title}
                            </Typography>
                            <Typography variant="h3">1,600</Typography>
                        </Grid>
                        <Grid item>
                            <Avatar className={classnames(classes.avatar, this.props.iconStyle)}>
                                <this.props.icon className={classes.icon} />
                            </Avatar>
                        </Grid>
                    </Grid>
                    <div className={classes.difference}>
                        <ArrowUpwardIcon className={classes.differenceIcon} />
                        <Typography
                            className={classes.differenceValue}
                            variant="body2"
                        >
                            16%
          </Typography>
                        <Typography
                            className={classes.caption}
                            variant="caption"
                        >
                            Since last month
          </Typography>
                    </div>
                </CardContent>
            </Card>
        );
    }
}
TotalUsers.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    iconStyle: PropTypes.object
};
export default withStyles(styles)(TotalUsers);