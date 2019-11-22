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
    subTitle: {
        margin: '10px 0px -12px 10px',
        width: '100%'
    }
});
class ViewEmployee extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes, employee } = this.props;
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
        console.log("Current employee : " + JSON.stringify(employee));
        return (
            <React.Fragment>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            label="First name"
                            fullWidth
                            value={employee.firstName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            label="Middle name"
                            fullWidth
                            value={employee.middleName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            label="Last name"
                            fullWidth
                            value={employee.lastName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            label="Address information"
                            fullWidth
                            value={employee.address}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <KeyboardDatePicker
                            disableToolbar
                            // variant="inline"
                            format="yyyy-MM-dd"
                            label="Birthday"
                            value={employee.birthday}
                            readOnly
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone number"
                            fullWidth
                            value={employee.phone}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            fullWidth
                            value={employee.email}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl required fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="position-required">Position</InputLabel>
                            <Select
                                value={employee.position.id}
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
                        <KeyboardDatePicker
                            disableToolbar
                            // variant="inline"
                            format="yyyy-MM-dd"
                            label="Start Time"
                            value={employee.startTime}
                            readOnly
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
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
                                value={employee.identification.idNumber}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Location"
                                fullWidth
                                value={employee.identification.idLocation}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDatePicker
                                disableToolbar
                                // variant="inline"
                                format="yyyy-MM-dd"
                                label="Created at"
                                value={employee.identification.idCreated}
                                readOnly
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
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
                                value={employee.bank.bankNumber}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                fullWidth
                                value={employee.bank.bankName}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Branch"
                                fullWidth
                                value={employee.bank.bankBranch}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}
ViewEmployee.propTypes = {
    classes: PropTypes.object.isRequired,
    employee: PropTypes.object.isRequired,
};
export default withStyles(styles)(ViewEmployee);