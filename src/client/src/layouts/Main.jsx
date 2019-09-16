import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";

import Hidden from "@material-ui/core/Hidden";

// creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";
// core components
import { Navbar, Footer, Sidebar } from "../components";

import routes from "../routes.js";

import styles from "../assets/jss/material-react/layouts/mainStyles";

import bgImage from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";

let ps;

class Main extends Component {
    constructor(props) {
        super(props);
        this.mainPanel = React.createRef();
        this.state = ({
            image: bgImage,
            color: 'blue',
            fixedClasses: 'dropdown show',
        });
    }
    switchRoutes = () => {
        return (
            <Switch>
                {
                    routes.map((prop, key) => {
                        if (prop.layout === "/task") {
                            return (
                                <Route
                                    path={prop.layout + prop.path}
                                    component={prop.component}
                                    key={key}
                                />
                            );
                        }
                        return null;
                    })
                }
            </Switch>
        );
    }
    componentWillMount() {
        this.resizeFunction();
    }

    resizeFunction = () => {
        const { drawerToggleMobileClose, changeToDesktop, changeToMobile } = this.props;
        if (window.innerWidth >= 960) {
            drawerToggleMobileClose();
            changeToDesktop();
        } else {
            changeToMobile();
        }
    };

    render() {
        // styles
        const { classes, ...rest } = this.props;
        const { mobileOpen, desktopOpen } = this.props;
        return (
            <React.Fragment>
                <div className={classes.wrapper}>
                    <Sidebar
                        routes={routes}
                        logoText={"TLCN"}
                        logo={logo}
                        image={this.state.image}
                        color={this.state.color}
                        {...rest}
                    />
                    <div className={classNames(classes.mainPanel, { [" " + classes.mainPanelOpen]: this.props.desktopOpen })} ref={this.mainPanel}>
                        <Navbar
                            routes={routes}
                            {...rest}
                        />
                        <Hidden smDown implementation="css">
                            <div className={classNames(classes.content, { [" " + classes.contentClose]: !this.props.desktopOpen && this.props.mode === 'desktop' })}>
                                <div className={classes.container}>{this.switchRoutes()}</div>
                            </div>
                        </Hidden>
                        <Hidden mdUp implementation="css">
                            <div className={classes.content}>
                                <div className={classes.container}>{this.switchRoutes()}</div>
                            </div>
                        </Hidden>
                        <Footer />
                    </div>

                </div>

            </React.Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        desktopOpen: state.layout.desktopOpen,
        mobileOpen: state.layout.mobileOpen,
        mode: state.layout.mode,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        drawerToggleMobileClose: () => dispatch({ type: 'DRAWER_TOGGLE_MOBILE_CLOSE' }),
        drawerToggleDesktopClose: () => dispatch({ type: 'DRAWER_TOGGLE_DESKTOP_CLOSE' }),
        changeToDesktop: () => dispatch({ type: 'CHANGE_TO_DESKTOP' }),
        changeToMobile: () => dispatch({ type: 'CHANGE_TO_MOBILE' }),
    }
}
Main.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main)));