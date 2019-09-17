import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
// @material-ui/core components
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import { CustomInput, CustomButton } from "../";

import styles from "../../assets/jss/material-react/components/headerLinksStyle";
class MainNavbarLink extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            openNotification: null,
            openProfile: null
        });
    }
    render() {
        const { classes } = this.props;
        const handleClickNotification = event => {
            if (this.state.openNotification && this.state.openNotification.contains(event.target)) {
                this.setState({
                    openNotification: null,
                })
            } else {
                this.setState({
                    openNotification: event.currentTarget,
                })
            }
        };
        const handleCloseNotification = () => {
            this.setState({
                openNotification: null,
            })
        };
        const handleClickProfile = event => {
            if (this.state.openProfile && this.state.openProfile.contains(event.target)) {
                this.setState({
                    openNotification: null,
                })
            } else {
                this.setState({
                    openNotification: event.currentTarget,
                })
            }
        };
        const handleCloseProfile = () => {
            this.setState({
                openNotification: null,
            })
        };
        return (
            <React.Fragment>
                <div className={classes.searchWrapper}>
                    <CustomInput
                        formControlProps={{
                            className: classes.margin + " " + classes.search
                        }}
                        inputProps={{
                            // className: classes.inputSearch,
                            placeholder: "Search",
                            inputProps: {
                                "aria-label": "Search",
                            },
                            style: {
                                color: "#FFF",
                            }
                        }}
                    />
                    <CustomButton color="white" aria-label="edit" justIcon round>
                        <Search />
                    </CustomButton>
                </div>
                <div className={classes.manager}>
                    <CustomButton
                        color={window.innerWidth > 959 ? "transparent" : "white"}
                        justIcon={window.innerWidth > 959}
                        simple={!(window.innerWidth > 959)}
                        aria-owns={this.state.openNotification ? "notification-menu-list-grow" : null}
                        aria-haspopup="true"
                        onClick={handleClickNotification}
                        className={classes.buttonLink}
                    >
                        <Notifications className={classes.icons} />
                        <span className={classes.notifications}>5</span>
                        <Hidden mdUp implementation="css">
                            <p onClick={handleCloseNotification} className={classes.linkText}>
                                Notification
                        </p>
                        </Hidden>
                    </CustomButton>
                    <Poppers
                        open={Boolean(this.state.openNotification)}
                        anchorEl={this.state.openNotification}
                        transition
                        disablePortal
                        className={
                            classNames({ [classes.popperClose]: !this.state.openNotification }) +
                            " " +
                            classes.popperNav
                        }
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="notification-menu-list-grow"
                                style={{
                                    transformOrigin:
                                        placement === "bottom" ? "center top" : "center bottom"
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleCloseNotification}>
                                        <MenuList role="menu">
                                            <MenuItem
                                                onClick={handleCloseNotification}
                                                className={classes.dropdownItem}
                                            >
                                                Mike John responded to your email
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleCloseNotification}
                                                className={classes.dropdownItem}
                                            >
                                                You have 5 new tasks
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleCloseNotification}
                                                className={classes.dropdownItem}
                                            >
                                                You{"'"}re now friend with Andrew
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleCloseNotification}
                                                className={classes.dropdownItem}
                                            >
                                                Another Notification
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleCloseNotification}
                                                className={classes.dropdownItem}
                                            >
                                                Another One
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Poppers>
                </div>
                <div className={classes.manager}>
                    <CustomButton
                        color={window.innerWidth > 959 ? "transparent" : "white"}
                        justIcon={window.innerWidth > 959}
                        simple={!(window.innerWidth > 959)}
                        aria-owns={this.state.openProfile ? "profile-menu-list-grow" : null}
                        aria-haspopup="true"
                        onClick={handleClickProfile}
                        className={classes.buttonLink}
                    >
                        <Person className={classes.icons} />
                        <Hidden mdUp implementation="css">
                            <p className={classes.linkText}>Profile</p>
                        </Hidden>
                    </CustomButton>
                    <Poppers
                        open={Boolean(this.state.openProfile)}
                        anchorEl={this.state.openProfile}
                        transition
                        disablePortal
                        className={
                            classNames({ [classes.popperClose]: !this.state.openProfile }) +
                            " " +
                            classes.popperNav
                        }
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="profile-menu-list-grow"
                                style={{
                                    transformOrigin:
                                        placement === "bottom" ? "center top" : "center bottom"
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleCloseProfile}>
                                        <MenuList role="menu">
                                            <MenuItem
                                                onClick={handleCloseProfile}
                                                className={classes.dropdownItem}
                                            >
                                                Profile
                                </MenuItem>
                                            <MenuItem
                                                onClick={handleCloseProfile}
                                                className={classes.dropdownItem}
                                            >
                                                Settings
                                </MenuItem>
                                            <Divider light />
                                            <MenuItem
                                                onClick={handleCloseProfile}
                                                className={classes.dropdownItem}
                                            >
                                                Logout
                                </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Poppers>
                </div>
            </React.Fragment>
        );
    }
}
MainNavbarLink.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MainNavbarLink);