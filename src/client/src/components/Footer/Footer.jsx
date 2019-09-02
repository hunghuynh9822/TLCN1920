import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import classNames from "classnames";
// @material-ui/core components
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
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
                        <List className={classes.list}>
                            <ListItem className={classes.inlineBlock}>
                                <a href="#home" className={classes.block}>
                                    Home
                        </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a href="#company" className={classes.block}>
                                    Company
                        </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a href="#portfolio" className={classes.block}>
                                    Portfolio
                        </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a href="#blog" className={classes.block}>
                                    Blog
                        </a>
                            </ListItem>
                        </List>
                    </div>
                    <p className={classes.right}>
                        <span>
                            &copy; {1900 + new Date().getYear()}{" "}
                            <a
                                href="https://www.creative-tim.com?ref=mdr-footer"
                                target="_blank"
                                className={classes.a}
                            >
                                Creative Tim
                        </a>
                            , made with love for a better web
                    </span>
                    </p>
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