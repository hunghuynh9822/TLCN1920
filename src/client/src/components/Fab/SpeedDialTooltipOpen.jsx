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
import CreateIcon from '@material-ui/icons/Create';

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

class SpeedDialTooltipOpen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openCreate = this.openCreate.bind(this);
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

    openCreate() {
        this.props.openCreate();
        this.setState({
            open: false
        })
    }

    render() {
        const { classes, stylesSpeedDial } = this.props;
        const { open } = this.state;
        const actions = [
            { icon: <CreateIcon />, name: 'New', action: this.openCreate },
            // { icon: <SaveIcon />, name: 'Save', action: this.handleClose },
            // { icon: <PrintIcon />, name: 'Print', action: this.handleClose },
            // { icon: <ShareIcon />, name: 'Share', action: this.handleClose },
            // { icon: <FavoriteIcon />, name: 'Like', action: this.handleClose },
        ];
        return (
            // <div className={classes.root}>
            <React.Fragment>
                {/* <Backdrop open={open} /> */}
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    className={stylesSpeedDial}
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
                            onClick={action.action}
                        />
                    ))}
                </SpeedDial>
            </React.Fragment>
        );
    }
}
SpeedDialTooltipOpen.propTypes = {
    classes: PropTypes.object.isRequired,
    openCreate: PropTypes.func.isRequired,
    stylesSpeedDial: PropTypes.string.isRequired,
};
export default withStyles(styles)(SpeedDialTooltipOpen);