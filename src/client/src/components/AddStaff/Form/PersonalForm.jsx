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

const styles = theme => ({
    subTitle: {
        margin: '10px 0px -12px 10px',
        width: '100%'
    }
});
class PersonalForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes, handleInputChange, handleDatePickerChange, request } = this.props;
        const handleBirthday = (date) => {
            handleDatePickerChange('birthday', date);
        }
        const handleIdCreatedAt = (date) => {
            handleDatePickerChange('idCreated', date);
        }
        return (
            <React.Fragment>
                {/* <Typography variant="h6" gutterBottom>
                    Personal Information
                </Typography> */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Address information"
                            fullWidth
                            autoComplete="address"
                            value={request.address}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <KeyboardDatePicker
                            // disableToolbar
                            // variant="inline"
                            openTo="year"
                            disableFuture
                            format="yyyy-MM-dd"
                            id="birthday"
                            name="birthday"
                            label="DOB"
                            value={request.birthday}
                            onChange={handleBirthday}
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
                                required
                                id="idNumber"
                                name="idNumber"
                                label="Number"
                                fullWidth
                                autoComplete="idNumber"
                                value={request.idNumber}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="idLocation"
                                name="idLocation"
                                label="Location"
                                fullWidth
                                autoComplete="idLocation"
                                value={request.idLocation}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDatePicker
                                disableFuture
                                openTo="year"
                                // disableToolbar
                                // variant="inline"
                                format="yyyy-MM-dd"
                                id="idCreated"
                                name="idCreated"
                                label="Created at"
                                value={request.idCreated}
                                onChange={handleIdCreatedAt}
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
                                required
                                id="bankNumber"
                                name="bankNumber"
                                label="Number"
                                fullWidth
                                autoComplete="bankNumber"
                                value={request.bankNumber}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="bankName"
                                name="bankName"
                                label="Name"
                                fullWidth
                                autoComplete="bankName"
                                value={request.bankName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="bankBranch"
                                name="bankBranch"
                                label="Branch"
                                fullWidth
                                autoComplete="bankBranch"
                                value={request.bankBranch}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}
PersonalForm.propTypes = {
    classes: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleDatePickerChange: PropTypes.func.isRequired,
};
export default withStyles(styles)(PersonalForm);