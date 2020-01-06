import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import { create } from '../../action/task';

import { TagMember } from '..';
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

import Avatar from 'react-avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    buttonAdd: {
        margin: theme.spacing(1),
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
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
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
});
class TaskDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openAdd: false,
            scroll: 'body',
            assignee: null,
            request: {
                projectId: '',
                employeeCreator: '',
                employeeAssignee: '',
                title: '',
                description: '',
                startedAt: new Date(),
                duration: '',
                endAt: new Date()
            }
        }
        this.getName = this.getName.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleStartedAt = this.handleStartedAt.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeAssignee = this.removeAssignee.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpenAdd = this.handleOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
    }

    getName(employee) {
        return employee.lastName + " " + employee.firstName;
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

    handleDatePickerChange(name, date) {
        // console.log(`handleInputChange - Name : ${name} value : ${date}`);
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request[name] = date;
            return { request };
        })
    }

    handleStartedAt(date) {
        this.handleDatePickerChange('startedAt', date);
    }

    handleDuration(date) {
        const diffTime = Math.abs(date - this.state.request.startedAt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.handleDatePickerChange('duration', diffDays);
        this.handleDatePickerChange('endAt', date);
    }

    handleSubmit() {
        const { alert } = this.props;
        const { currentUser, projectItem } = this.props;
        let projectId = projectItem.project.id;
        console.log("Assignee " + JSON.stringify(this.state.assignee));
        const request = {
            projectId: projectId,
            employeeCreator: currentUser.id,
            employeeAssignee: this.state.assignee.id,
            title: this.state.request.title,
            description: this.state.request.description,
            startedAt: this.state.request.startedAt,
            duration: this.state.request.duration
        }
        console.log("Request create task : " + JSON.stringify(request));
        create(request)
            .then(response => {
                console.log(response);
                this.setState({
                    open: false,
                    openAdd: false,
                    assignee: null,
                    request: {
                        projectId: '',
                        employeeCreator: '',
                        employeeAssignee: '',
                        title: '',
                        description: '',
                        startedAt: new Date(),
                        duration: ''
                    }
                })
            }).catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
            });
    }

    removeAssignee(member) {
        this.setState({
            assignee: null,
        })
    }

    handleListItemClick(member) {
        this.setState({
            assignee: member,
            openAdd: false,
        });
    }

    handleOpen() {
        this.setState({
            open: true,
        })
    }

    handleClose() {
        this.setState({
            open: false,
            openAdd: false,
            assignee: null,
            request: {
                projectId: '',
                employeeCreator: '',
                employeeAssignee: '',
                title: '',
                description: '',
                startedAt: new Date(),
                duration: '',
                endAt: new Date()
            }
        })
    }

    handleOpenAdd() {
        this.setState({
            openAdd: true,
        })
    }

    handleCloseAdd() {
        this.setState({
            openAdd: false,
        })
    }

    render() {
        const { classes } = this.props;
        const { projectItem } = this.props;
        const { open, openAdd, request, scroll } = this.state;
        let members = projectItem.members;
        // console.log(members);
        return (
            <React.Fragment>
                <Button onClick={this.handleOpen} size="medium" color="primary" variant="contained" className={classes.buttonAdd}>
                    <AddIcon className={classes.addIcon} style={{ fontSize: 20 }} />
                    New Task
        </Button>
                <Dialog
                    open={open}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogTitle id="scroll-dialog-title">New task</DialogTitle>
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
                                <TextField
                                    id="description"
                                    name="description"
                                    fullWidth
                                    required
                                    label="Description"
                                    multiline
                                    placeholder="Description"
                                    rows="6"
                                    variant="outlined"
                                    value={request.description}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item xs={2}>Assignee</Grid>
                                <Grid item xs={10}>
                                    <div>
                                        <Button onClick={this.handleOpenAdd} size="medium" color="primary" className={classes.icon_add}><AddIcon /></Button>
                                        {this.state.assignee !== null ? (
                                            <TagMember member={this.state.assignee} removeMember={this.removeAssignee} />
                                        ) : null}
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    required
                                    disableToolbar
                                    variant="inline"
                                    format="dd-MM-yyyy"
                                    label="Start Time"
                                    value={request.startedAt}
                                    onChange={this.handleStartedAt}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    required
                                    disableToolbar
                                    variant="inline"
                                    format="dd-MM-yyyy"
                                    label="End Time"
                                    value={request.endAt}
                                    onChange={this.handleDuration}
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
                <Dialog onClose={this.handleCloseAdd} aria-labelledby="simple-dialog-title" open={openAdd}>
                    <DialogTitle id="simple-dialog-title">Select employee</DialogTitle>
                    <List>
                        {members.length !== 0 ? members.map((member, index) => (
                            <ListItem button onClick={() => this.handleListItemClick(member)} key={index}>
                                <ListItemAvatar>
                                    {member.imageUrl ? (
                                        <Avatar src={member.imageUrl} round="20px" size="30" />
                                    ) : (
                                            <Avatar name={this.getName(member)} round="20px" size="30" />
                                        )
                                    }
                                </ListItemAvatar>
                                <ListItemText primary={member.email} />
                            </ListItem>
                        )) : (
                                <ListItemText primary="No employee" />
                            )}
                    </List>
                </Dialog>
            </React.Fragment>
        );
    }
}
TaskDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.object.isRequired,
    handleOpen: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,

};

const mapStateToProps = (state, ownProps) => {
    return {
        projectItem: state.project.projectItem,
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
        loginRole: state.auth.loginRole,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(TaskDetails)));