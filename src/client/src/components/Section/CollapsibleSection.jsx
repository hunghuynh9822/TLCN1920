import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';

import color from 'color';

const styles = theme => ({
    area: {
        marginBottom: '10px',
    },
    bar: {
        height: '50px',
        '&:hover': {
            background: color('#e6e6e6')
                .hex()
        },
        padding: '12px 0px 12px 15px',
        margin: '15px 0px 15px 0px',
    },
    container:{
        display: 'flex', /* or inline-flex */
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
})
class CollapsibleSection extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const { title, children } = this.props;
        return (
            <div className={classes.area}>
                <div className={classes.bar}>
                    <ExpandMore /> {title}
                    </div>
                <div className={classes.container}>
                    {children}
                </div>
            </div>
        );
    }
}
CollapsibleSection.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
};
export default withStyles(styles)(CollapsibleSection);