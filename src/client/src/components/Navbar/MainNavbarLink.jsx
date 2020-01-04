import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";

import { connect } from 'react-redux';
import { withAlert } from 'react-alert'
import axios from 'axios';
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
import Avatar from 'react-avatar';

// core components
import { CustomInput, CustomButton } from "../";

import { logout } from '../../action/auth';
import { ACCESS_TOKEN } from '../../constants'
import { serverUrl } from '../../action/index';
import styles from "../../assets/jss/material-react/components/headerLinksStyle";
class MainNavbarLink extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            openNotification: null,
            openProfile: null,
            rows : [],
            notify : 0
        });
    }
    componentDidMount(){
        this.getData();
        setInterval(this.getData, 5000); 
    }

    getData = () => {
        const {currentUser} = this.props;
        var url = serverUrl+"/api/notify/" + currentUser.id
        axios.get(url)
        .then(response =>{
            var temp = response.data;    
            // console.log(temp);
            var temp_false = []
            var notify = 0;
            temp.forEach(element => {
                if (element.view == false){
                    temp_false.push(element)
                    notify += 1 ;
                }
        });
        this.setState({
            rows: temp_false,
            notify : notify
        })

        })
        .catch(error => console.log("ok loi ne notify lisst"+error))
      }

    render() {
        const { classes } = this.props;
        const { currentUser } = this.props;
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
                    openProfile: null,
                })
            } else {
                this.setState({
                    openProfile: event.currentTarget,
                })
            }
        };
        const handleCloseProfile = () => {
            this.setState({
                openProfile: null,
            })
        };

        const handleLogout = () => {
            this.props.logout();
            localStorage.removeItem(ACCESS_TOKEN);
            this.props.alert.success("You're safely logged out!");
        }

        var numNotify;
        if (this.state.notify > 0) {
        numNotify = <span className={classes.notifications}>{this.state.notify}</span>;
        }
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
                        style={{ padding: 0 }}
                    >
                        <Notifications className={classes.icons} />
                       
                        {/* <span className={classes.notifications}>{this.state.notify}</span> */}
                        {numNotify}
                    
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
                                            {this.state.rows.map((element, i) => {     
                                            // console.log("Entered");                 
                                            // Return the element. Also pass key     
                                            return ( 
                                                <MenuItem
                                                onClick={handleCloseNotification}
                                                className={classes.dropdownItem}                                             
                                            >
                                                {element.content}
                                            </MenuItem>
                                            ) 
                                            })}
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
                        {/* <Person className={classes.icons} /> */}
                        {currentUser.imageUrl ? (
                            <Avatar src={currentUser.imageUrl} round="20px" size="30"/>
                        ):(
                            <Avatar name={currentUser.lastName + " " + currentUser.firstName} round="20px" size="30"/>
                        )}
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
                                                onClick={({element}) => handleCloseProfile}
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
                                                onClick={handleLogout}
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

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.auth.currentUser,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(withStyles(styles)(MainNavbarLink)));