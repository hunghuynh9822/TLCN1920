import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { DialogTitleCustom } from '../../components';
const styles = theme => ({
    buttonAdd: {
        // margin: theme.spacing(1),
        marginLeft: theme.spacing(3)
    },
    paper: {
        width: 400,
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            padding: theme.spacing(3),
        },
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
class NewNotify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'body',
            request: {
                "content": "",
            }
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
        const { addNot } = this.props;
        event.preventDefault();
        var temp = { "title": request.content, "content": request.content }
        addNot(temp)
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
                    New notify
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
                    }}>New notify form</DialogTitleCustom>
                    <Paper className={classes.paper}>
                        <Grid container direction="row">
                            <Grid item xs={12}>
                                <TextField
                                    id="content"
                                    name="content"
                                    fullWidth
                                    required
                                    label="Content"
                                    multiline
                                    placeholder="Content"
                                    rows="6"
                                    variant="outlined"
                                    value={this.state.request.content}
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
NewNotify.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NewNotify);