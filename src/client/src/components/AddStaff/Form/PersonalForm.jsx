import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({

});
class PersonalForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Personal Information
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Address information"
                            fullWidth
                            autoComplete="address"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="birthday"
                            name="birthday"
                            label="Birthday"
                            fullWidth
                            autoComplete="birthday"
                        />
                    </Grid>
                    <Typography variant="h6" gutterBottom>
                                Identification
                            </Typography>
                    <Grid item container xs={12} spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="idNumber"
                                name="idNumber"
                                label="Number"
                                fullWidth
                                autoComplete="idNumber"
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="idCreated"
                                name="idCreated"
                                label="Created at"
                                fullWidth
                                autoComplete="idCreated"
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="h6" gutterBottom>
                                Banking
                            </Typography>
                    <Grid item container xs={12} spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="bankNumber"
                                name="bankNumber"
                                label="Number"
                                fullWidth
                                autoComplete="bankNumber"
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
};
export default withStyles(styles)(PersonalForm);