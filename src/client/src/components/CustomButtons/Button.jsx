import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// nodejs library that concatenates classes
import classNames from "classnames";

import Button from "@material-ui/core/Button";

import styles from "../../assets/jss/material-react/components/buttonStyle";

class RegularButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const {
            color,
            round,
            children,
            disabled,
            simple,
            size,
            block,
            link,
            justIcon,
            className,
            muiClasses,
            ...rest
        } = this.props;
        const btnClasses = classNames({
            [classes.button]: true,
            [classes[size]]: size,
            [classes[color]]: color,
            [classes.round]: round,
            [classes.disabled]: disabled,
            [classes.simple]: simple,
            [classes.block]: block,
            [classes.link]: link,
            [classes.justIcon]: justIcon,
            [className]: className
        });
        return (
            <Button {...rest} classes={muiClasses} className={btnClasses}>
                {this.props.children}
            </Button>
        );
    }
}
RegularButton.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "rose",
        "white",
        "transparent"
    ]),
    size: PropTypes.oneOf(["sm", "lg"]),
    simple: PropTypes.bool,
    round: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    link: PropTypes.bool,
    justIcon: PropTypes.bool,
    className: PropTypes.string,
    // use this to pass the classes props from Material-UI
    muiClasses: PropTypes.object,
    children: PropTypes.node,
};
export default withStyles(styles)(RegularButton);