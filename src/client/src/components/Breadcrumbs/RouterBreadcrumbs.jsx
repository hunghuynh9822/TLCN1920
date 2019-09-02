import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';

import styles from '../../assets/jss/material-react/components/breadcrumbStyle.js'

import routes from '../../routes.js'

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        console.log(window.location.pathname);
        const pathnames = window.location.pathname.split('/').filter(x => x);
        return (
            <div style={{ float: "left" }}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="inherit" />} aria-label="breadcrumb" className={classes.root}>
                    <Link color="inherit" to="/" style={{ textDecoration: "none" }}>
                        Home
                </Link>
                    {pathnames.map((value, index) => {
                        const last = index === pathnames.length - 1;
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        var prop = routes.filter((prop) => {
                            return prop.path === to;
                        });
                        console.log();
                        return last ? (
                            <Typography color="textPrimary" key={to} className={classes.lastCrumb}>
                                {prop[0].breadcrumb}
                            </Typography>
                        ) : (
                                <Link color="inherit" to={to} key={to} className={classes.bodyCrumb}>
                                    {prop[0].breadcrumb}
                                </Link>
                            );
                    })}
                </Breadcrumbs>
            </div>

        );
    }
}
Breadcrumb.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Breadcrumb);