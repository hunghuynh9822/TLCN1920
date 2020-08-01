import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
    DatePicker
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MaterialUIPickers from './MaterialUIPickers'

import { DialogTitleCustom } from '../../components';

const styles = theme => ({
    buttonAdd: {
        // margin: theme.spacing(1),
        marginLeft: theme.spacing(3)
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
        boxShadow: 'none',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    button: {
        // marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    icon_add: {
        background: '#e6e8ec',
        color: '#696f7a',
        borderRadius: '5px',
        minWidth: '30px',
        minHeight: '30px',
        padding: '0px',
        margin: '0px 10px',
    },
    dialog_list: {
        width: '350px'
    },
    dialog_list_item: {
        // backgroundColor: `${background}`,
        // boxShadow: `${background} 0px 0px 5px 2px`,
        '&:hover': {
            // background: '#e6e6e6',
        },
    },
    label: {
        margin: 0,
        width: '150px',
        lineHeight: '65px',
    }
});

class NewRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'body',
            request: {
                "timestart": new Date(),
                "timeend": new Date(),
                "reason": "",
            }
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDateStart = this.handleDateStart.bind(this);
        this.handleDateEnd = this.handleDateEnd.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOpen() {
        this.setState({
            open: true
        })
    }
    handleClose() {
        this.setState({
            open: false
        })
    }
    handleDateStart(date) {
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request['timestart'] = date;
            return { request };
        })
    }
    handleDateEnd(date) {
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request['timeend'] = date;
            return { request };
        })
    }
    getDate = (date) => {
        var day = date.getDate();
        var monthIndex = date.getMonth() + 1;
        var year = date.getFullYear();
        var tepm = day + "/" + monthIndex + "/" + year
        return tepm
    }
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request[name] = value;
            return { request };
        })
    }
    handleSubmit(event) {
        const { request } = this.state;
        const { addReq } = this.props;
        event.preventDefault();
        var temp = { "t1": request.timestart, "t2": request.timeend, "timestart": this.getDate(request.timestart), "timeend": this.getDate(request.timeend), "reason": request.reason, "confirm": false, "action": [{ "name": "view" }, { "name": "confirm" }] }
        addReq(temp);
        this.setState({
            open: false
        })
    }
    render() {
        const { classes } = this.props;
        const { open, scroll } = this.state;
        return (
            <React.Fragment>
                <Button onClick={this.handleOpen} size="medium" color="primary" variant="contained" className={classes.buttonAdd}>
                    <AddIcon className={classes.addIcon} style={{ fontSize: 20 }} />
                    New request
                </Button>
                <Dialog
                    open={open}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                // disableBackdropClick
                // disableEscapeKeyDown
                >
                    <DialogTitleCustom id="customized-dialog-title" onClose={this.handleClose} style={{
                        // paddingBottom: '25px',
                    }}>Request Form</DialogTitleCustom>
                    <Paper className={classes.paper}>
                        <Grid container direction="row">
                            <Grid item xs={12} style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                            }}>
                                <div className={classes.label}>Time start</div>
                                <div><MaterialUIPickers getDate={this.handleDateStart} /></div>
                            </Grid>
                            <Grid item xs={12} style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                            }}>
                                <div className={classes.label}>Time end</div>
                                <div><MaterialUIPickers getDate={this.handleDateEnd} /></div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="reason"
                                    name="reason"
                                    fullWidth
                                    required
                                    label="Reason"
                                    multiline
                                    placeholder="Reason"
                                    rows="6"
                                    variant="outlined"
                                    value={this.state.request.reason}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    <DialogActions className={classes.buttons}>
                        {/* <Button onClick={this.handleClose} className={classes.button}>
                            Close
            </Button> */}
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleSubmit}
                        >
                            Create
            </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}
NewRequest.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NewRequest);