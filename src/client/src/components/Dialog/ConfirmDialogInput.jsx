import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    content: {
        width: '400px'
    }
});
class ConfirmDialogInput extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const { open, title, content } = this.props;
        const { handleClose, handleSubmit } = this.props;
        return (
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent className={classes.content}>
                    <DialogContentText id="alert-dialog-description">
                        {content()}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                </Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                        Agree
                </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
ConfirmDialogInput.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,

};
export default withStyles(styles)(ConfirmDialogInput);