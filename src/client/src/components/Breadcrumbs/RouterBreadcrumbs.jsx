import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';

import styles from '../../assets/jss/material-react/components/breadcrumbStyle.js'

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const { router } = this.props;
        const pathnames = window.location.pathname.split('/').filter(x => x);
        return (
            <div style={{ float: "left" }}>
                <Breadcrumbs separator={<NavigateNextIcon className={classes.iconNext} fontSize="inherit" />} aria-label="breadcrumb" className={classes.root}>
                    {pathnames.map((value, index) => {
                        if (index === 0) {
                            return (
                                <Link color="inherit" to="/" key={"/"} className={classes.homeCrumb}>
                                    Home
                                </Link>
                            );
                        }
                        const last = index === pathnames.length - 1;
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        var prop = router.routes.filter((prop) => {
                            let path = prop.layout + prop.path;
                            console.log("path " + path + " to " + to);
                            return to === path;
                        });
                        if (prop[0] === undefined) {
                            // return (
                            //     <Typography color="textPrimary" key={to} className={classes.lastCrumb}>
                            //         None
                            //     </Typography>)
                            return null;
                        }
                        return last ? (
                            <Typography color="textPrimary" key={to} className={classes.lastCrumb}>
                                {prop[0].breadcrumb}
                            </Typography>
                        ) : (
                                <Link color="inherit" to={to} key={to} className={classes.homeCrumb}>
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
    router: PropTypes.object.isRequired,
};
export default withStyles(styles)(Breadcrumb);