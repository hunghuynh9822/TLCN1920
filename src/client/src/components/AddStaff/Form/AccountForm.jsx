import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
    KeyboardDatePicker,
} from '@material-ui/pickers';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    formControl: {
        // margin: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});
class AccountForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes, handleInputChange, handleDatePickerChange, request } = this.props;
        const handleStartTime = (date) => {
            handleDatePickerChange('startTime', date);
        }
        const data = {
            positions:[
                // {
                //     id: 1,
                //     name: 'Management'
                // },
                {
                    id: 2,
                    name: 'Team Leader'
                },{
                    id: 3,
                    name: 'Human Resource'
                },{
                    id: 4,
                    name: 'Staff'
                }
            ]
        }
        return (
            <React.Fragment>
                {/* <Typography variant="h6" gutterBottom>
                    Account Information
                </Typography> */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            fullWidth
                            autoComplete="firstName"
                            value={request.firstName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="middleName"
                            name="middleName"
                            label="Middle name"
                            fullWidth
                            autoComplete="middleName"
                            value={request.middleName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            fullWidth
                            autoComplete="lastName"
                            value={request.lastName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="Phone number"
                            fullWidth
                            autoComplete="phone"
                            value={request.phone}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                            value={request.email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl required fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="position-required">Position</InputLabel>
                            <Select
                                value={request.positionId}
                                onChange={handleInputChange}
                                name="positionId"
                                
                                inputProps={{
                                    id: 'position-required',
                                }}
                                className={classes.selectEmpty}
                            >
                                <MenuItem key={0} value="">
                                    <em>None</em>
                                </MenuItem>
                                {data.positions.map((value)=>(
                                    <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <KeyboardDatePicker
                            disableToolbar
                            // variant="inline"
                            format="yyyy-MM-dd"
                            id="startTime"
                            name="startTime"
                            label="Start Time"
                            value={request.startTime}
                            onChange={handleStartTime}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}
AccountForm.propTypes = {
    classes: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleDatePickerChange: PropTypes.func.isRequired,
};
export default withStyles(styles)(AccountForm);