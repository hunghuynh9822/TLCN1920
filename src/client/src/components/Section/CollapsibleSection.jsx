import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import classnames from "classnames";

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
    container: {
        display: 'flex', /* or inline-flex */
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    hidden: {
        display: 'none'
    },
    hiddenBar: {
        background: color('#e6e6e6')
            .hex()
    }
})
class CollapsibleSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            close: false
        }
    }



    render() {
        const { classes } = this.props;
        const { title, children } = this.props;
        const closeBar = () => {
            this.setState({
                close: !this.state.close
            })
        }
        return (
            <div className={classes.area} onClick={closeBar}>
                <div className={classnames(classes.bar, { [classes.hiddenBar]: this.state.close })}>
                    {this.state.close ? <ChevronRight /> : <ExpandMore />} {title}
                </div>
                <div className={classnames(classes.container, { [classes.hidden]: this.state.close })}>
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