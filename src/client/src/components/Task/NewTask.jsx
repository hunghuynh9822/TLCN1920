import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import { create, TASK_STATE } from '../../action/task';

import { TagMember, TagTask, DialogTitleCustom } from '../../components';
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
    }
});

const background = '#f5f8ff';
const colorWord = "#ffffff";
const mapColor = {
    "NEW": "#0ac400",
    "DEVELOPING": "#e69900",
    "DEVELOPED": "#00d8db",
    "TESTING": "#ff0000",
    "DONE": "#0026ff",
    "FINISH": "#0026ff"
}

class NewTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAdd: false,
            openAddPrevious: false,
            scroll: 'body',
            assignee: null,
            previousTasks: new Array(),
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
        this.handleListItemMemberClick = this.handleListItemMemberClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpenAdd = this.handleOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleOpenAddPrevious = this.handleOpenAddPrevious.bind(this);
        this.handleCloseAddPrevious = this.handleCloseAddPrevious.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.removePreviousTask = this.removePreviousTask.bind(this);
    }

    getColor(state) {
        return mapColor[state];
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
        let preTaskId = "";
        this.state.previousTasks.forEach((task, index) => {
            if (index === this.state.previousTasks.length - 1) {
                preTaskId = preTaskId + task.id;
            } else {
                preTaskId = preTaskId + task.id + ","
            }
        })
        console.log("[NewTask] preTaskId " + preTaskId)
        const request = {
            projectId: projectId,
            preTaskId: preTaskId,
            employeeCreator: currentUser.id,
            employeeAssignee: this.state.assignee.id,
            title: this.state.request.title,
            description: this.state.request.description,
            startedAt: this.state.request.startedAt,
            duration: this.state.request.duration ? this.state.request.duration : 1
        }
        console.log("Request create task : " + JSON.stringify(request));
        create(request)
            .then(response => {
                console.log(response);
                this.props.loadProject();
                this.props.loadTasks();
                this.setState({
                    openAdd: false,
                    assignee: null,
                    previousTasks: new Array(),
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

    removePreviousTask(task) {
        let tasks = this.state.previousTasks;
        if (tasks === undefined || tasks === null || tasks === []) {
            return;
        }
        tasks = tasks.filter((item, index) => {
            return item.id !== task.id;
        })
        this.setState({
            previousTasks: tasks
        })
    }

    handleListItemMemberClick(member) {
        this.setState({
            assignee: member,
            openAdd: false,
        });
    }

    handleListItemClick(task) {
        let tasks = this.state.previousTasks === undefined ? new Array() : this.state.previousTasks;
        tasks.push(task);
        tasks = tasks.filter((item, index) => {
            console.log(item, index, tasks.indexOf(item), tasks.indexOf(item) === index);
            return tasks.indexOf(item) === index;
        })
        console.log("[NewTask][previousTasks] " + JSON.stringify(tasks));
        this.setState({
            previousTasks: tasks
        })
    }

    handleClose() {
        const { handleCloseCreate } = this.props;
        handleCloseCreate();
        this.setState({
            openAdd: false,
            openAddPrevious: false,
            assignee: null,
            previousTasks: new Array(),
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

    handleOpenAddPrevious() {
        this.setState({
            openAddPrevious: true,
        })
    }

    handleCloseAddPrevious() {
        this.setState({
            openAddPrevious: false,
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

    getTaskId(id) {
        return "#" + id;
    }
    render() {
        const { classes } = this.props;
        const { projectItem, openCreate } = this.props;
        const { openAdd, openAddPrevious, request, scroll } = this.state;
        let members = projectItem.members;
        let tasks = projectItem.tasks;
        // console.log(members);
        // console.log("[NewTask][projectItem][tasks] " + JSON.stringify(tasks));
        return (
            <React.Fragment>
                <Dialog
                    open={openCreate}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    {/* <DialogTitle id="scroll-dialog-title">New task</DialogTitle> */}
                    <DialogTitleCustom id="customized-dialog-title" onClose={this.handleClose} style={{
                        paddingBottom: '25px',
                    }}>New task</DialogTitleCustom>
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
                                <Grid item xs={4}>Previous task : </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <Button onClick={this.handleOpenAddPrevious} size="medium" color="primary" className={classes.icon_add}><AddIcon /></Button>
                                        {this.state.previousTasks != undefined && this.state.previousTasks != null && this.state.previousTasks != [] ? (
                                            this.state.previousTasks.map((task) => {
                                                return (
                                                    <TagTask task={task} removeTask={this.removePreviousTask} key={task.id} />
                                                )
                                            })
                                        ) : null}
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item xs={2}>Assignee</Grid>
                                <Grid item xs={12}>
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
                                <Grid item xs={8}>
                                    <TextField
                                        id="duration"
                                        name="duration"
                                        type="number"
                                        inputProps={{ min: "0", max: "10", step: "1" }}
                                        fullWidth
                                        required
                                        label="Duration"
                                        placeholder="Duration"
                                        variant="standard"
                                        value={request.duration}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                {/* <DatePicker
                                    required
                                    disableToolbar
                                    variant="inline"
                                    format="dd-MM-yyyy"
                                    label="End Time"
                                    value={request.endAt}
                                    onChange={this.handleDuration}
                                /> */}
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
                <Dialog onClose={this.handleCloseAdd} aria-labelledby="simple-dialog-title" open={openAdd}>
                    <DialogTitleCustom id="customized-dialog-title" onClose={this.handleCloseAdd}>Select employee</DialogTitleCustom>
                    <List classes={{
                        root: classes.dialog_list
                    }}>
                        {members.length !== 0 ? members.map((member, index) => (
                            <ListItem button onClick={() => this.handleListItemMemberClick(member)} key={index}>
                                <ListItemAvatar>
                                    {member.imageUrl ? (
                                        <Avatar src={member.imageUrl} round="20px" size="30" />
                                    ) : (
                                            <Avatar name={this.getName(member)} round="20px" size="30" />
                                        )
                                    }
                                </ListItemAvatar>
                                <ListItemText primary={this.getName(member)} />
                            </ListItem>
                        )) : (
                                <ListItemText primary="No employee" />
                            )}
                    </List>
                </Dialog>
                <Dialog onClose={this.handleCloseAddPrevious} aria-labelledby="simple-dialog-title" open={openAddPrevious} >
                    <DialogTitleCustom id="customized-dialog-title" onClose={this.handleCloseAddPrevious}>
                        Select previous tasks :
                    </DialogTitleCustom>
                    <List classes={{
                        root: classes.dialog_list
                    }}>
                        {tasks.length !== 0 ? tasks.map((task, index) => (
                            <ListItem button onClick={() => this.handleListItemClick(task)} key={index} classes={{
                                root: classes.dialog_list_item
                            }}>
                                <ListItemText >
                                    <Grid container spacing={3}>
                                        <Grid item xs={3} sm={3}>
                                            <Button disabled variant="outlined" size="small" color="primary" style={{
                                                alignSelf: 'flex-start',
                                                borderStyle: 'dashed',
                                                fontSize: '0.6em',
                                                marginBottom: '8px',
                                                opacity: '0.7',
                                                color: `${colorWord}`,
                                                backgroundColor: `${this.getColor(task.state)}`
                                            }}>
                                                {task.state}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={9} sm={9}>{task.title}</Grid>
                                    </Grid>
                                </ListItemText>
                            </ListItem>
                        )) : (
                                <ListItemText primary="No task" />
                            )}
                    </List>
                </Dialog>
            </React.Fragment>
        );
    }
}
NewTask.propTypes = {
    classes: PropTypes.object.isRequired,
    loadTasks: PropTypes.func.isRequired,
    loadProject: PropTypes.func.isRequired,
    openCreate: PropTypes.bool.isRequired,
    handleCloseCreate: PropTypes.func.isRequired,
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(NewTask)));