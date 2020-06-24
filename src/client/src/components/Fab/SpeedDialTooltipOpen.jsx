import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
    // root: {
    //     // height: 380,
    //     transform: 'translateZ(0px)',
    //     flexGrow: 1,
    // },
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
});

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
    { icon: <FavoriteIcon />, name: 'Like' },
];

class SpeedDialTooltipOpen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOpen() {
        this.setState({
            open: true
        })
    };

    handleClose() {
        this.setState({
            open: false
        })
    };
    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            // <div className={classes.root}>
            <React.Fragment>
                {/* <Backdrop open={open} /> */}
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    className={classes.speedDial}
                    // hidden={hidden}
                    icon={<SpeedDialIcon />}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    open={open}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={this.handleClose}
                        />
                    ))}
                </SpeedDial>
            </React.Fragment>
        );
    }
}
SpeedDialTooltipOpen.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SpeedDialTooltipOpen);