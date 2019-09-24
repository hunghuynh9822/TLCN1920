import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import classNames from "classnames";
// @material-ui/core components
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import {Copyright} from "../index"
import styles from "../../assets/jss/material-react/components/footerStyle";
class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <footer className={classNames(classes.footer, { [" " + classes.footerClose]: !this.props.desktopOpen && this.props.mode === 'desktop' })}>
                <div className={classes.container}>
                    <div className={classes.left}>
                        Demo content
                    </div>
                    <div className={classes.right}>
                        <Copyright/>
                    </div>
                </div>
            </footer>
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
Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, null)(withStyles(styles)(Footer));