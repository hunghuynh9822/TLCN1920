import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Slider from "react-slick";

import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    slider: {
        width: '100%',
    }
});
class TaskContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const settings = {
            className: classNames("center", classes.slider),
            infinite: false,
            centerPadding: "60px",
            slidesToShow: 3,
            swipeToSlide: true,
            afterChange: function (index) {
                console.log(
                    `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
                );
            }
        };
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Slider {...settings}>
                        {this.props.children}
                    </Slider>
                </div>
            </React.Fragment>
        );
    }
}
TaskContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TaskContainer);