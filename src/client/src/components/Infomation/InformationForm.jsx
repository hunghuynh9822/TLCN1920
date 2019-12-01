import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAlert } from 'react-alert'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import {
    DatePicker 
} from '@material-ui/pickers';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { getEmployee, updateEmployee } from '../../action/employee';

const styles = theme => ({
    subTitle: {
        margin: '10px 0px -12px 10px',
        width: '100%'
    }
});
class InformationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readOnly: true,
            requestUpdate: {
                firstName: '',
                middleName: '',
                lastName: '',
                address: '',
                birthday: new Date(),
                idNumber: '',
                idCreated: new Date(),
                idLocation: '',
                bankNumber: '',
                bankName: '',
                bankBranch: ''
            },
        }

        this.handleUpdateEmployee = this.handleUpdateEmployee.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
        this.handleIdCreatedAt = this.handleIdCreatedAt.bind(this);
    }

    componentDidMount() {
        const { alert } = this.props;
        const { curEmployee } = this.props;
        console.log("Current employee : " + JSON.stringify(curEmployee));
        getEmployee(curEmployee.id)
            .then(response => {
                this.setState({
                    requestUpdate: {
                        firstName: response.firstName,
                        middleName: response.middleName,
                        lastName: response.lastName,
                        address: response.address,
                        birthday: response.birthday,
                        idNumber: response.identification.idNumber,
                        idCreated: response.identification.idCreated,
                        idLocation: response.identification.idLocation,
                        bankNumber: response.bank.bankNumber,
                        bankName: response.bank.bankName,
                        bankBranch: response.bank.bankBranch
                    }
                })
            })
            .catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
            });
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        // console.log(`handleInputChange - Name : ${name} value : ${value}`);
        this.setState(prevState => {
            let requestUpdate = Object.assign({}, prevState.requestUpdate);
            requestUpdate[name] = value;
            return { requestUpdate };
        })
    }

    handleBirthday(date) {
        this.handleDatePickerChange('birthday', date);
    }

    handleIdCreatedAt(date) {
        this.handleDatePickerChange('idCreated', date);
    }

    handleDatePickerChange(name, date) {
        // console.log(`handleInputChange - Name : ${name} value : ${date}`);
        this.setState(prevState => {
            let requestUpdate = Object.assign({}, prevState.requestUpdate);
            requestUpdate[name] = date;
            return { requestUpdate };
        })
    }

    handleUpdateEmployee() {
        const { alert } = this.props;
        const { curEmployee } = this.props;
        const { requestUpdate, readOnly } = this.state;
        const { handleUpdate } = this.props;
        if (readOnly) {
            this.setState({
                readOnly: false
            })
        } else {
            updateEmployee(curEmployee.id, requestUpdate)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        readOnly: true
                    })
                    handleUpdate();
                })
                .catch(error => {
                    console.log(error);
                    //(error && error.message) || 
                    alert.error('Oops! Something went wrong. Please try again!');
                });
        }
    }

    render() {
        const { classes } = this.props;
        const { requestUpdate, readOnly } = this.state;
        const { curEmployee } = this.props;
        const data = {
            positions: [
                {
                    id: 1,
                    name: 'Management'
                },
                {
                    id: 2,
                    name: 'Team Leader'
                }, {
                    id: 3,
                    name: 'Human Resource'
                }, {
                    id: 4,
                    name: 'Staff'
                }
            ]
        }
        return (
            <React.Fragment>
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={this.handleUpdateEmployee} className={classes.button}>
                            {readOnly ? "Edit" : "Save"}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="First name"
                            fullWidth
                            value={requestUpdate.firstName}
                            InputProps={{
                                readOnly: Boolean(readOnly),
                            }}
                            onChange={this.handleInputChange}
                            name="firstName"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Middle name"
                            fullWidth
                            value={requestUpdate.middleName}
                            InputProps={{
                                readOnly: Boolean(readOnly),
                            }}
                            onChange={this.handleInputChange}
                            name="middleName"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Last name"
                            fullWidth
                            value={requestUpdate.lastName}
                            InputProps={{
                                readOnly: Boolean(readOnly),
                            }}
                            onChange={this.handleInputChange}
                            name="lastName"
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            label="Address information"
                            fullWidth
                            value={requestUpdate.address}
                            InputProps={{
                                readOnly: Boolean(readOnly),
                            }}
                            onChange={this.handleInputChange}
                            name="address"
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <DatePicker
                            disableFuture
                            openTo="year"
                            format="yyyy-MM-dd"
                            // format="dd-MM-yyyy"
                            label="Date of birth"
                            views={["year", "month", "date"]}
                            value={requestUpdate.birthday}
                            readOnly={readOnly}
                            onChange={this.handleBirthday}
                            name="birthday"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            label="Phone number"
                            fullWidth
                            value={curEmployee.phone}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            label="Email"
                            fullWidth
                            value={curEmployee.email}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl required fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="position-required">Position</InputLabel>
                            <Select
                                value={curEmployee.position.id}
                                name="positionId"
                                inputProps={{
                                    name: "positionId",
                                    id: 'position-required',
                                    readOnly: true,
                                }}
                                className={classes.selectEmpty}
                            >
                                <MenuItem key={-1} value="">
                                    <em>None</em>
                                </MenuItem>
                                {data.positions.map((value) => (
                                    <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            required
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-dd"
                            label="Start Time"
                            value={curEmployee.startTime}
                            readOnly
                        />
                    </Grid>

                    <Grid item container xs={12} spacing={3}>
                        <Typography variant="h6" className={classes.subTitle} gutterBottom>
                            Identification
                        </Typography>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Number"
                                fullWidth
                                value={requestUpdate.idNumber}
                                InputProps={{
                                    readOnly: Boolean(readOnly),
                                }}
                                onChange={this.handleInputChange}
                                name="idNumber"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Location"
                                fullWidth
                                value={requestUpdate.idLocation}
                                InputProps={{
                                    readOnly: Boolean(readOnly),
                                }}
                                onChange={this.handleInputChange}
                                name="idLocation"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                format="yyyy-MM-dd"
                                label="Created at"
                                views={["year", "month", "date"]}
                                value={requestUpdate.idCreated}
                                readOnly={readOnly}
                                onChange={this.handleIdCreatedAt}
                                name="idCreated"
                            />
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} spacing={3}>
                        <Typography variant="h6" className={classes.subTitle} gutterBottom>
                            Banking
                        </Typography>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Number"
                                fullWidth
                                value={requestUpdate.bankNumber}
                                InputProps={{
                                    readOnly: Boolean(readOnly),
                                }}
                                onChange={this.handleInputChange}
                                name="bankNumber"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                fullWidth
                                value={requestUpdate.bankName}
                                InputProps={{
                                    readOnly: Boolean(readOnly),
                                }}
                                onChange={this.handleInputChange}
                                name="bankName"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Branch"
                                fullWidth
                                value={requestUpdate.bankBranch}
                                InputProps={{
                                    readOnly: Boolean(readOnly),
                                }}
                                onChange={this.handleInputChange}
                                name="bankBranch"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}
InformationForm.propTypes = {
    classes: PropTypes.object.isRequired,
    curEmployee: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
};
export default withStyles(styles)(withAlert()(InformationForm));