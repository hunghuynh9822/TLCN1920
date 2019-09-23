import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import classNames from "classnames";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// core components
import { MainNavbarLink } from "../";

import styles from "../../assets/jss/material-react/components/sidebarStyle";

class Sidebar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const { handleDrawerToggleMobile, handleDrawerToggleDesktop, drawerToggleDesktopClose } = this.props;
        // verifies if routeName is the one active (in browser input)
        function activeRoute(routeName) {
            console.log("activeRoute "+window.location.pathname)
            return window.location.pathname === routeName ? true : false;
        }
        const { color, logo, image, logoText, routes } = this.props;
        var links = (
            <List className={classes.list}>
                {routes.map((prop, key) => {
                    var activePro = " ";
                    var listItemClasses = classNames({
                            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
                        });
                    const whiteFontClasses = classNames({
                        [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
                    });
                    return (
                        <NavLink
                            to={prop.layout + prop.path}
                            className={activePro + classes.item}
                            activeClassName="active"
                            key={key}
                        >
                            <ListItem button className={classes.itemLink + listItemClasses}>
                                {typeof prop.icon === "string" ? (
                                    <Icon
                                        className={classNames(classes.itemIcon, whiteFontClasses, {
                                            [classes.itemIconRTL]: this.props.rtlActive
                                        })}
                                    >
                                        {prop.icon}
                                    </Icon>
                                ) : (
                                        <prop.icon
                                            className={classNames(classes.itemIcon, whiteFontClasses, {
                                                [classes.itemIconRTL]: this.props.rtlActive
                                            })}
                                        />
                                    )}
                                <ListItemText
                                    primary={this.props.rtlActive ? prop.rtlName : prop.name}
                                    className={classNames(classes.itemText, whiteFontClasses, {
                                        [classes.itemTextRTL]: this.props.rtlActive
                                    })}
                                    disableTypography={true}
                                />
                            </ListItem>
                        </NavLink>
                    );
                })}
            </List>
        );
        var brand = (
            <div className={classes.logo}>
                {this.props.desktopOpen ?
                    <a
                        href="https://www.creative-tim.com?ref=mdr-sidebar"
                        className={classNames(classes.logoLink, {
                            [classes.logoLinkRTL]: this.props.rtlActive
                        })}
                        target="_blank"
                    >
                        <div className={classes.logoImage}>
                            <img src={logo} alt="logo" className={classes.img} />
                        </div>
                        {logoText}
                    </a> : <div className={classes.space}></div>
                }
                <Hidden smDown className={classes.hidden}>
                    <div className={classNames(classes.toolbarIcon, {
                        [classes.toolbarIconClose]: !this.props.desktopOpen
                    })} style={{ minHeight: "40px" }}>
                        <IconButton onClick={drawerToggleDesktopClose} style={{ color: "white", padding: "0px" }}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                </Hidden>
            </div>
        );
        return (
            <React.Fragment>
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor="right"
                        open={this.props.mobileOpen}
                        classes={{
                            paper: classNames(classes.drawerPaper, {
                                [classes.drawerPaperRTL]: this.props.rtlActive
                            })
                        }}
                        onClose={handleDrawerToggleMobile}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {brand}
                        <div className={classes.sidebarWrapper}>
                            {/* {this.props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />} */}
                            <MainNavbarLink />
                            {links}
                        </div>
                        {image !== undefined ? (
                            <div
                                className={classes.background}
                                // style={{ backgroundImage: "url(" + image + ")" }}
                                style={{backgroundColor: '#0F1642'}}
                            />
                        ) : null}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        anchor="right"
                        variant="permanent"
                        open={this.props.desktopOpen}
                        classes={{
                            paper: classNames(classes.drawerPaper, {
                                [classes.drawerPaperRTL]: this.props.rtlActive
                            }, {
                                    [classes.drawerPaperClose]: !this.props.desktopOpen
                                })
                        }}
                        onClose={handleDrawerToggleDesktop}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {brand}
                        <div className={classes.sidebarWrapper}>{links}</div>
                        {image !== undefined ? (
                            <div
                                className={classes.background}
                                // style={{ backgroundImage: "url(" + image + ")" }}
                                style={{backgroundColor: '#0F1642'}}
                            />
                        ) : null}
                    </Drawer>
                </Hidden>
            </React.Fragment>
        );
    }
}
Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    rtlActive: PropTypes.bool,
    bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
    logo: PropTypes.string,
    image: PropTypes.string,
    logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state, ownProps) => {
    return {
        mobileOpen: state.layout.mobileOpen,
        desktopOpen: state.layout.desktopOpen
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleDrawerToggleMobile: () => dispatch({ type: 'DRAWER_TOGGLE_MOBILE' }),
        handleDrawerToggleDesktop: () => dispatch({ type: 'DRAWER_TOGGLE_DESKTOP' }),
        drawerToggleDesktopClose: () => dispatch({ type: 'DRAWER_TOGGLE_DESKTOP_CLOSE' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar));