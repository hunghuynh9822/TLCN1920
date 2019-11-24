import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    paper: {
        marginTop: '0px',
        marginBottom: '0px',
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: '0px',
            marginBottom: '0px',
            padding: theme.spacing(3),
            paddingTop: '0px',
        },
        paddingTop: '0px',
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        // marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
});
class CustomDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scroll: 'body',
            activeStep: 0,
            submitted: false,
        }
    }

    render() {
        const { classes } = this.props;
        const { scroll, activeStep, submitted } = this.state;
        const { open, title, steps, request } = this.props;
        const { handleClose, handleSubmit, handleResponse, getStepContent } = this.props;
        const handleNext = () => {
            this.setState({
                activeStep: this.state.activeStep + 1
            })
        }

        const handleBack = () => {
            this.setState({
                activeStep: this.state.activeStep - 1
            })
        }

        const updateForm = (event) => {
            handleSubmit(event);
            this.setState({
                activeStep: this.state.activeStep + 1,
                submitted: true,
            })
        }

        const closeForm = () => {
            handleClose();
            this.setState({
                activeStep: 0,
                submitted: false,
            })
        }

        const renderAction = () => {
            if (request.method === 'confirm' || request.method === 'view') {
                if (activeStep === steps.length) {
                    if (submitted) {
                        return (
                            <Button onClick={closeForm} className={classes.button}>
                                Close
                            </Button>
                        )
                    } else {
                        return (
                            <React.Fragment>
                                <Button onClick={closeForm} className={classes.button}>
                                    Close
                                </Button>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} className={classes.button}>
                                        Back
                                    </Button>
                                )}
                            </React.Fragment>
                        )
                    }
                } else {
                    return (
                        <React.Fragment>
                            <Button onClick={closeForm} className={classes.button}>
                                Close
                            </Button>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} className={classes.button}>
                                    Back
                                </Button>
                            )}
                            {activeStep === steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={updateForm}
                                >
                                    Submit
                                    </Button>
                            ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        Next
                                        </Button>
                                )
                            }
                        </React.Fragment>
                    )
                }
            }
        };

        const renderResponse = () => {
            if (request.method === 'confirm' || request.method === 'view') {
                if (activeStep === steps.length) {
                    return (
                        <React.Fragment>
                            {handleResponse()}
                        </React.Fragment>
                    )
                } else {
                    return (
                        <React.Fragment>
                            {getStepContent(this.state.activeStep)}
                        </React.Fragment>
                    )
                }
            }
        };

        const renderStepper = () => {
            if (request.method === 'confirm' || request.method === 'view') {
                return (
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                )
            }
        };

        return (
            <React.Fragment>
                <Dialog
                    open={open}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
                    <Paper className={classes.paper}>
                        {renderStepper()}
                        <React.Fragment>
                            {renderResponse()}
                        </React.Fragment>
                    </Paper>
                    <DialogActions className={classes.buttons}>
                        {renderAction()}
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}
CustomDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    steps: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleResponse: PropTypes.func.isRequired,
    getStepContent: PropTypes.func.isRequired,
};
export default withStyles(styles)(CustomDialog);