import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';

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

import { AccountForm, PersonalForm, Review } from './Form';

import { Fade } from '../'
const styles = theme => ({
    modal: {
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
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
class RequestAddStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            activeStep: 0,
            scroll: 'body',
            steps: ['Account Information', 'Personal Information', 'Summary'],
            submitted: false
        }
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return <AccountForm />;
            case 1:
                return <PersonalForm />;
            case 2:
                return <Review />;
            default:
                throw new Error('Unknown step');
        }
    }

    render() {
        const { classes } = this.props;
        const { activeStep, open, scroll, steps, submitted } = this.state;

        const handleOpen = () => {
            this.setState({
                open: true
            })
        };

        const handleClose = () => {
            if (submitted) {
                this.setState({
                    submitted: false,
                    open: false,
                    activeStep: 0,
                })
            } else {
                this.setState({
                    open: false
                })
            }
        };

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

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log("Submit " + this.state.activeStep);
            // const { alert } = this.props;
            // const loginRequest = Object.assign({}, { phoneOrEmail: this.state.phoneOrEmail, password: this.state.password });
            // login(loginRequest)
            //     .then(response => {
            //         // console.log(response.tokenType);
            //         this.props.authenticate(true, null);
            //         localStorage.setItem(ACCESS_TOKEN, response.tokenType);
            //         alert.success("You're successfully logged in!", { timeout: 1000, });
            //         // this.props.history.push("/");
            //     }).catch(error => {
            //         console.log(error);
            //         this.setState({
            //             error: error
            //         })
            //         //(error && error.message) || 
            //         alert.error('Oops! Something went wrong. Please try again!');
            //     });
            this.setState({
                activeStep: this.state.activeStep + 1,
                submitted: true
            })
        }

        const renderAction = () => {
            if (activeStep === steps.length) {
                if (submitted) {
                    return (
                        <Button onClick={handleClose} className={classes.button}>
                            Close
                        </Button>
                    )
                }
            } else {
                return (
                    <React.Fragment>
                        <Button onClick={handleClose} className={classes.button}>
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
                                onClick={handleSubmit}
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
        };

        return (
            <div>
                <Button variant="contained" color="primary" onClick={handleOpen} className={classes.button}>
                    Add Staff
                </Button>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogTitle id="scroll-dialog-title">Add Staff</DialogTitle>
                    <Paper className={classes.paper}>

                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Register employee successfully
                                        </Typography>
                                    <Typography variant="subtitle1">
                                        Your employee id is #1212334534. Your generate password is <strong>asuhausdh</strong>
                                        </Typography>
                                </React.Fragment>
                            ) : (
                                    <React.Fragment>
                                        {this.getStepContent(this.state.activeStep)}
                                    </React.Fragment>
                                )}
                        </React.Fragment>
                    </Paper>
                    <DialogActions className={classes.buttons}>
                        {renderAction()}
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}
RequestAddStaff.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(RequestAddStaff);