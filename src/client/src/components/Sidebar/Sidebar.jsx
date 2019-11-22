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

        this.activeRoute = this.activeRoute.bind(this);
        this.getPathToProjectId = this.getPathToProjectId.bind(this);
        this.getNavRoute = this.getNavRoute.bind(this);
        this.getLogoBrand = this.getLogoBrand.bind(this);
    }

    // verifies if routeName is the one active (in browser input)
    activeRoute(layout, path) {
        if (path === "") {
            return window.location.pathname === layout;
        }
        return window.location.pathname.includes(layout + path);
    }

    getPathToProjectId(path, projectId) {
        let temp = path.replace(':projectId', 'project');
        if (projectId !== null) {
            temp = path.replace(':projectId', projectId);
        }
        console.log('Get param project id : ' + temp);
        return temp;
    }

    getNavRoute() {
        const { classes } = this.props;
        const { projectId } = this.props;
        const { color, router } = this.props;
        return (
            <List className={classes.list}>
                {router.routes.map((prop, key) => {
                    var listItemClasses = classNames({
                        [" " + classes[color]]: this.activeRoute(prop.layout, prop.path)
                    });
                    const whiteFontClasses = classNames({
                        [" " + classes.whiteFont]: this.activeRoute(prop.layout, prop.path)
                    });
                    let path = prop.path;
                    if (path.includes(':projectId')) {
                        path = this.getPathToProjectId(path, projectId);
                    }
                    return (
                        <NavLink
                            to={prop.layout + path}
                            className={classes.item}
                            activeClassName="active"
                            key={key}
                        >
                            <ListItem button className={classes.itemLink + listItemClasses}>
                                {typeof prop.icon === "string" ? (
                                    <Icon
                                        className={classNames(classes.itemIcon, whiteFontClasses)}
                                    >
                                        {prop.icon}
                                    </Icon>
                                ) : (
                                        <prop.icon
                                            className={classNames(classes.itemIcon, whiteFontClasses)}
                                        />
                                    )}
                                <ListItemText
                                    primary={this.props.rtlActive ? prop.rtlName : prop.name}
                                    className={classNames(classes.itemText, whiteFontClasses)}
                                    disableTypography={true}
                                />
                            </ListItem>
                        </NavLink>
                    );
                })}
            </List>
        )
    }

    getLogoBrand() {
        const { classes } = this.props;
        const { logo, logoText } = this.props;
        const { drawerToggleDesktopClose } = this.props;
        return (
            <div className={classes.logo}>
                {this.props.desktopOpen ?
                    <a
                        href="https://www.creative-tim.com?ref=mdr-sidebar"
                        className={classes.logoLink}
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
        )
    }

    render() {
        const { classes } = this.props;
        const { handleDrawerToggleMobile, handleDrawerToggleDesktop } = this.props;
        const { image } = this.props;
        return (
            <React.Fragment>
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor="right"
                        open={this.props.mobileOpen}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        onClose={handleDrawerToggleMobile}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {this.getLogoBrand()}
                        <div className={classes.sidebarWrapper}>
                            <MainNavbarLink />
                            {this.getNavRoute()}
                        </div>
                        {image !== undefined ? (
                            <div
                                className={classes.background}
                                // style={{ backgroundImage: "url(" + image + ")" }}
                                style={{ backgroundColor: '#0F1642' }}
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
                                [classes.drawerPaperClose]: !this.props.desktopOpen
                            })
                        }}
                        onClose={handleDrawerToggleDesktop}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {this.getLogoBrand()}
                        <div className={classes.sidebarWrapper}>{this.getNavRoute()}</div>
                        {image !== undefined ? (
                            <div
                                className={classes.background}
                                // style={{ backgroundImage: "url(" + image + ")" }}
                                style={{ backgroundColor: '#0F1642' }}
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
    router: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        mobileOpen: state.layout.mobileOpen,
        desktopOpen: state.layout.desktopOpen,
        projectId: state.project.projectId,
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