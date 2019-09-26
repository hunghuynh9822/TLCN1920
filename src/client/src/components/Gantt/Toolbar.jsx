import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({

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
                <label key={value} className={`radio-label ${isActive ? 'radio-label-active' : ''}`}>
                    <input type='radio'
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