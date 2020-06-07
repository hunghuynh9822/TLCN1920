import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//
import classNames from "classnames";
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
//
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import CKEditor from 'ckeditor4-react';
//
import { TreeViewCustom } from '../../components';
const styles = theme => ({
    wiki_page: {
        padding: '10px',
    },
    sub_layout_header: {

    },
    sub_header: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '35px',
        lineHeight: '35px',
        backgroundColor: 'white',
    },
    sub_header_section: {
        flexBasis: '33%',
    },
    content: {
        padding: '10px 10px 0px 10px',
    },
    margin: {
        margin: theme.spacing(1),
        marginTop: 0,
        marginBottom: 0,
    },
    button: {
        // marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    button_create: {
        background: "#35C53F"
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
});
class WikiManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'body',
            request: {
                title: "",
                description: "",
            }
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClick() {
        console.log("[WikiManagement] Click button on header");
        this.handleOpen();
    }
    handleOpen() {
        this.setState({
            open: true,
        })
    }

    handleClose() {
        this.setState({
            open: false,
            request: {
                title: "",
                description: "",
            }
        })
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

    onEditorChange(evt) {
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request["description"] = evt.editor.getData();
            return { request };
        });
    }

    handleSubmit() {
        const { alert } = this.props;
        const { currentUser } = this.props;
        const request = {
            // title: this.state.request.title,
            // description: this.state.request.description,
            // employeeId: currentUser.id
        }
        console.log("[WikiManagement] Request create wiki : " + JSON.stringify(request));
    }
    render() {
        const { classes } = this.props;
        const { open, request, scroll } = this.state;
        return (
            <React.Fragment>
                <Grid container spacing={3} className={classes.wiki_page}>
                    <Grid item xs={3} sm={3}><TreeViewCustom /></Grid>
                    <Grid item xs={9} sm={9}>
                        <div className={classes.sub_layout_header}>
                            <div className={classes.sub_header}>
                                <div className={classes.sub_header_section}>
                                    {/* <Button onClick={this.handleClick} variant="contained" size="medium" color="primary" className={classNames(classes.margin, classes.button)}>
                                        Left
                                    </Button> */}
                                </div>
                                <div className={classes.sub_header_section}>
                                    {/* Center */}
                                </div>
                                <div className={classes.sub_header_section}>
                                    <Button onClick={this.handleClick} variant="contained" size="medium" color="primary" className={classNames(classes.margin, classes.button, classes.button_create)}>
                                        <AddIcon style={{ fontSize: 20 }} />
                                        Create Wiki
                                    </Button>
                                    <Button onClick={this.handleClick} variant="contained" size="medium" className={classNames(classes.margin, classes.button)}>
                                        <CreateIcon style={{ fontSize: 20 }} />
                                           Edit
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={classes.content}>
                            Wiki content
                        </div>
                    </Grid>
                </Grid>
                <Dialog
                    open={open}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogTitle id="scroll-dialog-title">New wiki</DialogTitle>
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    id="title"
                                    name="title"
                                    label="Title"
                                    required
                                    fullWidth
                                    placeholder="Title"
                                    variant="outlined"
                                    autoComplete="title"
                                    value={request.title}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <p>Description</p>
                                <CKEditor
                                    data={request.description}
                                    onChange={this.onEditorChange}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    <DialogActions className={classes.buttons}>
                        <Button onClick={this.handleClose} className={classes.button}>
                            Close
                        </Button>
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
WikiManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
        loginRole: state.auth.loginRole,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // updateProjectItem: (projectItem) => dispatch(updateProjectItem(projectItem)),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(WikiManagement)));