import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import classNames from "classnames";
// @material-ui/core components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from '@material-ui/icons/Menu';
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import { CustomButton, MainNavbarLink, RouterBreadcrumbs } from "../"

import styles from "../../assets/jss/material-react/components/headerStyle";

import bgImage from "../../assets/img/navbar.jpg"

class Navbar extends Component {
    constructor(props) {
        super(props);

    }
    makeBrand() {
        var name;
        this.props.routes.map(prop => {
            console.log('Navbar local : ' + window.location.href);
            if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
                name = prop.name;
            }
            return "No content";
        });
        return name;
    }
    render() {
        const { classes } = this.props;
        const { handleDrawerToggleMobile, handleDrawerToggleDesktop } = this.props;
        const { color } = this.props;
        const appBarClasses = classNames({
            [" " + classes[color]]: color,
            [" " + classes.appBarShift]: !this.props.desktopOpen
        });
        const iconMenuClasses = classNames({
            [" " + classes.menuButtonHidden]: this.props.desktopOpen
        });
        return (
            <AppBar className={classes.appBar + appBarClasses}>
                <Toolbar className={classes.container}>
                    <div className={classes.flex}>
                        <Hidden smDown className={classes.hidden}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerToggleDesktop}
                                className={classes.menuButton + iconMenuClasses}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <RouterBreadcrumbs />
                    </div>
                    <Hidden smDown implementation="css">
                        <MainNavbarLink />
                    </Hidden>
                    <Hidden mdUp implementation="css">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggleMobile}
                        >
                            <Menu />
                        </IconButton>
                    </Hidden>
                    <div
                        className={classes.background}
                        // style={{ backgroundImage: "url(" + bgImage + ")" }}
                        style={{ backgroundColor: '#344081' }}
                    />
                </Toolbar>
            </AppBar>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleDrawerToggleMobile: () => dispatch({ type: 'DRAWER_TOGGLE_MOBILE' }),
        handleDrawerToggleDesktop: () => dispatch({ type: 'DRAWER_TOGGLE_DESKTOP' })
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        desktopOpen: state.layout.desktopOpen,
    }
}
Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    rtlActive: PropTypes.bool,
    routes: PropTypes.arrayOf(PropTypes.object)
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));