import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import Slider from "react-slick";
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        height: '100%',
        backgroundColor: 'transanparent',
        overflow: 'hidden',
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
class SlideContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const settings = {
            className: classNames("center", classes.slider),
            infinite: false,
            centerPadding: "20px",
            slidesToShow: 5,
            swipeToSlide: true,
            adaptiveHeight: true,
            afterChange: function (index) {
                console.log(
                    `Slider Changed to: ${index + 1}`
                );
            },
            responsive: [
                {
                    breakpoint: 1650,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
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
SlideContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SlideContainer);