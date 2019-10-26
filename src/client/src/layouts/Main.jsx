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
            color: 'purple',
            fixedClasses: 'dropdown show',
        });
    }

    switchRoutes = (curRouter) => {
        return (
            <Switch>
                {
                    curRouter.routes.map((route, key) => {
                        if (route.path === "") {
                            return (
                                <Route
                                    exact
                                    path={route.layout + route.path}
                                    component={route.component}
                                    key={key}
                                />
                            );
                        }
                        if (route.routes === undefined) {
                            return (
                                <Route
                                    exact
                                    key={key}
                                    path={route.layout + route.path}
                                    render={props => (
                                        // pass the sub-routes down to keep nesting
                                        <route.component {...props} {...route} />
                                    )}
                                />
                            );
                        }
                        return (
                            <Route
                                key={key}
                                path={route.layout + route.path}
                                render={props => (
                                    // pass the sub-routes down to keep nesting
                                    <route.component {...props} {...route} />
                                )}
                            />
                        );
                    })
                }
                {/* <Redirect to={curLayout} /> */}
            </Switch>
        );
    }
    componentWillMount() {

    }

    componentWillUpdate() {
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
        const { match, history } = this.props;
        const { mobileOpen, desktopOpen } = this.props;
        const curLayout = match.url;
        const curRouter = routes.filter(route => route.layout === curLayout)[0];
        // console.log(curLayout + " : ");
        // console.log(curRouter.routes);
        return (
            <React.Fragment>
                <div className={classes.wrapper}>
                    <Sidebar
                        router={curRouter}
                        logoText={"TLCN"}
                        logo={logo}
                        image={this.state.image}
                        color={this.state.color}
                        {...rest}
                    />
                    <div className={classNames(classes.mainPanel, { [" " + classes.mainPanelOpen]: this.props.desktopOpen })} ref={this.mainPanel}>
                        <Navbar
                            router={curRouter}
                            {...rest}
                        />
                        <div className={classNames(classes.content, { [" " + classes.contentClose]: !this.props.desktopOpen && this.props.mode === 'desktop' })}>
                            <div className={classes.container}>{this.switchRoutes(curRouter)}</div>
                        </div>
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