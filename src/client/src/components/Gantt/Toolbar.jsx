import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
const styles = theme => ({
    radio_label: {
        "boxSizing": "border-box",
        "cursor": "pointer",
        "display": "inline-block",
        "height": "30px",
        "lineHeight": "28px",
        "marginLeft": "6px",
        "textAlign": "center",
        "width": "70px",
        "border": "1px solid #D9D9D9",
        "borderRadius": "2px",
        "background": "#fff",
        "color": "rgba(0, 0, 0, 0.7)",
        '& input': {
            "height": "0", "margin": "0", "visibility": "hidden", "width": "0"
        }
    },
    radio_label_active: {
        "background": "#a0a0a0",
        "color": "white",
        "borderColor": "#707070"
    },
});
class Toolbar extends Component {
    constructor(props) {
        super(props);
    }
    handleZoomChange = (e) => {
        if (this.props.onZoomChange) {
            this.props.onZoomChange(e.target.value)
        }
    }
    render() {
        const { classes } = this.props;
        const zoomRadios = ['Hours', 'Days', 'Months'].map((value) => {
            const isActive = this.props.zoom === value;
            return (
                <label key={value} className={classnames(classes.radio_label, { [classes.radio_label_active]: isActive })}>
                    <input
                        type='radio'
                        checked={isActive}
                        onChange={this.handleZoomChange}
                        value={value} />
                    {value}
                </label>
            );
        });

        return (
            <div className="tool-bar">
                <b>Zooming: </b>
                {zoomRadios}
            </div>
        );
    }
}
Toolbar.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Toolbar);