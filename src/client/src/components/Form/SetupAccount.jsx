import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

import {
    KeyboardDatePicker,
} from '@material-ui/pickers';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { getRoles } from '../../action/employee';

const styles = theme => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
class SetupAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes, handleChangeMultiple, request, roles } = this.props;
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-chip-label">Roles</InputLabel>
                            <Select
                                labelId="demo-mutiple-chip-label"
                                id="demo-mutiple-chip"
                                multiple
                                value={request.roles}
                                onChange={handleChangeMultiple}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                        {selected.map(value => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {roles.map(role => (
                                    <MenuItem key={role.id} value={role.name}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}
SetupAccount.propTypes = {
    classes: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    handleChangeMultiple: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
};
export default withStyles(styles)(SetupAccount);