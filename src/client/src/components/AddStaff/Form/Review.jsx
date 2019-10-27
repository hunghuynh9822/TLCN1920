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
class Review extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            label="First name"
                            fullWidth
                            defaultValue="Hello World"
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
                            defaultValue="Hello World"
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
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            label="Address information"
                            fullWidth
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Birthday"
                            fullWidth
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone number"
                            fullWidth
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            fullWidth
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Position"
                            fullWidth
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Start Time"
                            fullWidth
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    
                    <Typography variant="h6" gutterBottom>
                                Identification
                            </Typography>
                    <Grid item container xs={12} spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Number"
                                fullWidth
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Location"
                                fullWidth
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Created at"
                                fullWidth
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="h6" gutterBottom>
                                Banking
                            </Typography>
                    <Grid item container xs={12} spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Number"
                                fullWidth
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                fullWidth
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Branch"
                                fullWidth
                                defaultValue="Hello World"
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
Review.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Review);