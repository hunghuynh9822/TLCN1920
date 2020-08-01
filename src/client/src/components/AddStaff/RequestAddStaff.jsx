import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAlert } from 'react-alert'

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

import { create } from '../../action/employee'

import { generatePassword } from '../../action'
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
            submitted: false,
            error: null,
            request: {
                id: '',
                firstName: '',
                middleName: '',
                lastName: '',
                phone: '',
                email: '',
                positionId: '',
                startTime: new Date(),
                address: '',
                birthday: new Date(),
                idNumber: '',
                idLocation: '',
                idCreated: new Date(),
                bankNumber: '',
                bankName: '',
                bankBranch: '',
                password: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return <AccountForm request={this.state.request} handleInputChange={this.handleInputChange} handleDatePickerChange={this.handleDatePickerChange} />;
            case 1:
                return <PersonalForm request={this.state.request} handleInputChange={this.handleInputChange} handleDatePickerChange={this.handleDatePickerChange} />;
            case 2:
                return <Review request={this.state.request} />;
            default:
                throw new Error('Unknown step');
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        // console.log(`handleInputChange - Name : ${name} value : ${value}`);
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request[name] = value;
            return { request };
        })
    }

    handleDatePickerChange(name, date) {
        // console.log(`handleInputChange - Name : ${name} value : ${date}`);
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request[name] = date;
            return { request };
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        // this.setState(prevState => {
        //     let request = Object.assign({}, prevState.request);
        //     request.password = generatePassword(8);
        //     return { request };
        // })
        const { alert } = this.props;
        let createRequest = this.state.request;
        createRequest.password = generatePassword(8);
        console.log("Submit " + JSON.stringify(createRequest));
        create(createRequest)
            .then(response => {
                console.log(response);
                alert.success("Create user successfully!", { timeout: 1000, });
                this.setState({
                    request: { ...this.state.request, id: response.id },
                    activeStep: this.state.activeStep + 1,
                    submitted: true,
                    error: null
                })
            }).catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
                this.setState({
                    activeStep: this.state.activeStep + 1,
                    // submitted: true,
                    error: error
                })
            });

    }

    render() {
        const { classes } = this.props;
        const { scroll, steps } = this.state;
        const { activeStep, open, submitted, error } = this.state;

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
                    error: null,
                    request: {
                        id: '',
                        firstName: '',
                        middleName: '',
                        lastName: '',
                        phone: '',
                        email: '',
                        positionId: '',
                        startTime: new Date(),
                        address: '',
                        birthday: new Date(),
                        idNumber: '',
                        idLocation: '',
                        idCreated: new Date(),
                        bankNumber: '',
                        bankName: '',
                        bankBranch: '',
                        password: ''
                    }
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

        const renderAction = () => {
            if (activeStep === steps.length) {
                if (submitted) {
                    return (
                        <Button onClick={handleClose} className={classes.button}>
                            Close
                        </Button>
                    )
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
                        </React.Fragment>
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
                                onClick={this.handleSubmit}
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

        const renderResponse = () => {
            if (activeStep === steps.length) {
                if (error) {
                    return (
                        <Typography variant="h5" gutterBottom>
                            Register employee failed
                        </Typography>
                    )
                } else {
                    return (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Register employee successfully
                                    </Typography>
                            <Typography variant="subtitle1">
                                Register employee success. Your generate password is <strong>{this.state.request.password}</strong>
                            </Typography>
                        </React.Fragment>
                    )
                }
            } else {
                return (
                    <React.Fragment>
                        {this.getStepContent(this.state.activeStep)}
                    </React.Fragment>
                )
            }
        };

        return (
            <div>
                <Button variant="contained" color="primary" onClick={handleOpen} className={classes.button}>
                    Add Staff
                </Button>
                <Link variant="body2" onClick={handleOpen}>
                    Add new
                                </Link>

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
                            {renderResponse()}
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
export default withStyles(styles)(withAlert()(RequestAddStaff));