import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import { AssignTasks, CompleteTasks } from '../../';

import { getTasks, TASK_STATE, updateStateTasks, updatePointTasks } from '../../../action/task';
import { updateProjectTasks, updateTask, TASK_STATE_COLOR } from '../../../action/task';

import { loginAsAdmin, loginAsLead, loginAsStaff } from '../../../action/auth';

import SwipeableViews from 'react-swipeable-views';

import { NewTask, Loading, CenteredTabs, TabPanel, TagMember, TagTask, DialogTitleCustom, SpeedDialTooltipOpen } from '../../../components';
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

import StarBorderIcon from '@material-ui/icons/StarBorder';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const StyledRating = withStyles({
    iconFilled: {
        color: '#3d55d1',
    },
    iconHover: {
        color: '#5b73eb',
    },
})(Rating);

function getLabelText(value) {
    return `${value} Heart${value !== 1 ? 's' : ''}`;
}


const styles = theme => ({
    root: {
        height: '100%'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '35px',
        lineHeight: '35px',
        backgroundColor: 'white',
    },
    header_section: {
        flexBasis: '33%',
    },
    content: {
        height: '100%'
    },
    tabpanel: {
        overflow: 'hidden',
        height: '100%'
    },
    //Form
    buttonAdd: {
        // margin: theme.spacing(1),
        marginRight: theme.spacing(3),
        float: 'right'
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    speedDial: {
        position: 'fixed',
        top: theme.spacing(5),
        // right: theme.spacing(2),
    },
});
const background = '#f5f8ff';
const colorWord = "#ffffff";
class ProjectTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            loading: false,
            open: false,
            openAdd: false,
            scroll: 'body',
            openCreate: false,
            openAddPrevious: false,
            previousTasks: new Array(),
            projectTasks: {
                projectId: null,
                tasks: []
            },
            task: {
                taskId: null,
                projectId: null,
                employeeCreator: null,
                employeeAssignee: null,
                title: null,
                description: null,
                startedAt: new Date(),
                duration: null,
                endAt: new Date(),
                state: 0,
                point: 0
            },
        }
        this.handleChangeTabs = this.handleChangeTabs.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
        this.loadTasks = this.loadTasks.bind(this);
        this.openForm = this.openForm.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.getName = this.getName.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleStartedAt = this.handleStartedAt.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeAssignee = this.removeAssignee.bind(this);
        this.handleListItemMemberClick = this.handleListItemMemberClick.bind(this);
        this.handleOpenAdd = this.handleOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleSelectStateChange = this.handleSelectStateChange.bind(this);
        this.handlePointChange = this.handlePointChange.bind(this);
        //
        this.handleOpenAddPrevious = this.handleOpenAddPrevious.bind(this);
        this.handleCloseAddPrevious = this.handleCloseAddPrevious.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.removePreviousTask = this.removePreviousTask.bind(this);
        this.handleOpenCreate = this.handleOpenCreate.bind(this);
        this.handleCloseCreate = this.handleCloseCreate.bind(this);
    }

    handleChangeTabs = (event, newValue) => {
        this.loadTasks();
        this.setState({
            value: newValue,
        })
    }

    handleChangeIndex = index => {
        this.setState({
            value: index,
        })
    };

    //
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

    componentWillReceiveProps(nextProps) {
        if (this.state.reload) {
            this.setState({
                reload: false,
            })
        } else {
            const { alert } = this.props;
            const { loginRole, projectItem, currentUser } = this.props;
            let projectId = projectItem.project.id;
            if (nextProps.index == 1) {
                getTasks(projectId)
                    .then(response => {
                        this.props.updateProjectTasks(response);
                        this.setState({
                            projectTasks: response,
                            reload: true
                        })
                    })
            }
        }
    }

    loadTasks(projectTasks) {
        if (projectTasks) {
            console.log("[TaskContainer] loadTasks ", projectTasks)
            this.setState({
                loading: true
            });
            this.props.updateProjectTasks(projectTasks);
            this.setState({
                loading: false,
            })
        } else {
            console.log("Loading task");
            this.setState({
                loading: true
            });
            const { alert } = this.props;
            const { loginRole, projectItem, currentUser } = this.props;
            let projectId = projectItem.project.id;
            getTasks(projectId)
                .then(response => {
                    console.log("[ProjectTasks] getTasks response ", response)
                    this.props.updateProjectTasks(response);
                    this.setState({
                        projectTasks: response,
                        loading: false,
                    })
                })
        }
    }

    componentDidMount() {
        this.loadTasks();
    }

    openForm(task) {
        const { projectItem } = this.props;
        let tasks = projectItem.tasks;
        console.log("OPEN TASK : " + JSON.stringify(task))
        let duration = task.duration == null ? 24 * 60 * 60 * 1000 : task.duration * 24 * 60 * 60 * 1000;
        let preTaskIds = task.preTaskId == null ? new Array() : task.preTaskId.split(",");
        let previousTasks = new Array();
        preTaskIds.map((item, index) => {
            let task = tasks.find(element => element.id == item);
            if (task != undefined && task != null) {
                previousTasks.push(task)
            }
        })
        this.setState({
            open: true,
            previousTasks: previousTasks,
            task: { ...task, endAt: task.startedAt + duration },
        })
    }

    handleClose() {
        this.setState({
            open: false,
            previousTasks: new Array(),
            task: {
                taskId: null,
                projectId: null,
                employeeCreator: null,
                employeeAssignee: null,
                title: null,
                description: null,
                startedAt: new Date(),
                duration: null,
                endAt: new Date(),
                state: 0,
                point: 0
            },
        })
    }

    getName(employee) {
        return employee.lastName + " " + employee.firstName;
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        // console.log(`handleInputChange - Name : ${name} value : ${value}`);
        this.setState(prevState => {
            let task = Object.assign({}, prevState.task);
            task[name] = value;
            return { task };
        })
    }

    handleSelectStateChange(event) {
        const { alert } = this.props;
        const { currentUser, projectItem } = this.props;
        this.setState({
            task: { ...this.state.task, state: TASK_STATE[event.target.value] }
        });
        let request = {
            taskId: this.state.task.id,
            employeeId: currentUser.id,
            state: event.target.value,
            projectId: projectItem.project.id
        }
        console.log("Request update task : " + JSON.stringify(request));
        updateStateTasks(request)
            .then(response => {
                console.log(response);
                this.loadTasks();
            }).catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
            });
    }

    handlePointChange(event, newValue) {
        const { alert } = this.props;
        const { currentUser, projectItem } = this.props;
        this.setState({
            task: { ...this.state.task, point: newValue }
        });
        let request = {
            taskId: this.state.task.id,
            employeeId: currentUser.id,
            point: newValue,
            projectId: projectItem.project.id
        }
        console.log("Request update task : " + JSON.stringify(request));
        updatePointTasks(request)
            .then(response => {
                console.log(response);
                this.loadTasks();
            }).catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
            });
    }

    handleDatePickerChange(name, date) {
        // console.log(`handleInputChange - Name : ${name} value : ${date}`);
        this.setState(prevState => {
            let task = Object.assign({}, prevState.task);
            task[name] = date;
            return { task };
        })
    }

    handleStartedAt(date) {
        this.handleDatePickerChange('startedAt', date);
    }

    handleDuration(date) {
        const diffTime = Math.abs(date - this.state.task.startedAt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.handleDatePickerChange('duration', diffDays);
        this.handleDatePickerChange('endAt', date);
    }

    handleSubmit(event) {
        const { alert } = this.props;
        const { currentUser, projectItem } = this.props;
        const { task } = this.state;
        event.preventDefault();
        let projectId = projectItem.project.id;
        let preTaskId = "";
        let previousTasks = this.state.previousTasks;
        if (previousTasks != undefined && previousTasks != null && previousTasks != []) {
            previousTasks.forEach((task, index) => {
                if (index === previousTasks.length - 1) {
                    preTaskId = preTaskId + task.id;
                } else {
                    preTaskId = preTaskId + task.id + ","
                }
            })
        }
        console.log("[UpdateTask] Task : " + JSON.stringify(task));
        const request = {
            taskId: task.id,
            projectId: projectId,
            preTaskId: preTaskId,
            employeeCreator: task.employeeCreator,
            employeeId: task.employeeAssignee,
            title: task.title,
            description: task.description,
            state: TASK_STATE.indexOf(task.state),
            point: task.point,
            startedAt: task.startedAt,
            duration: task.duration
        }
        if (request.state === TASK_STATE.indexOf("FINISH")) {
            if (request.point === 0) {
                alert.error('Oops! Please set point to task before update task finish!');
                this.setState({
                    open: false,
                    previousTasks: new Array(),
                    task: {
                        taskId: null,
                        projectId: null,
                        employeeCreator: null,
                        employeeAssignee: null,
                        title: null,
                        description: null,
                        startedAt: new Date(),
                        duration: null,
                        endAt: new Date(),
                        state: 0,
                        point: 0
                    },
                })
                return;
            }
        }
        console.log("[UpdateTask] Request : " + JSON.stringify(request));
        updateTask(request)
            .then(response => {
                console.log(response);
                this.setState({
                    open: false,
                    previousTasks: new Array(),
                    task: {
                        taskId: null,
                        projectId: null,
                        employeeCreator: null,
                        employeeAssignee: null,
                        title: null,
                        description: null,
                        startedAt: new Date(),
                        duration: null,
                        endAt: new Date(),
                        state: 0,
                        point: 0
                    },
                })
                this.loadTasks();
            }).catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong when update task. Please call check!');
            });
    }

    removeAssignee(member) {
        this.setState({
            task: { ...this.state.task, employeeAssignee: null },
        })
    }

    handleListItemMemberClick(member) {
        this.setState({
            task: { ...this.state.task, employeeAssignee: member.id },
            openAdd: false,
        });
    }

    getTaskId(id) {
        return "#" + id;
    }

    handleListItemClick(task) {
        let tasks = this.state.previousTasks === undefined ? new Array() : this.state.previousTasks;
        tasks.push(task);
        tasks = tasks.filter((item, index) => {
            console.log(item, index, tasks.indexOf(item), tasks.indexOf(item) === index);
            return tasks.indexOf(item) === index;
        })
        console.log("[UpdateTask][previousTasks] " + JSON.stringify(tasks));
        this.setState({
            previousTasks: tasks
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

    getColor(state) {
        return TASK_STATE_COLOR[state];
    }

    handleOpenCreate() {
        console.log("[Task] Open form create")
        this.setState({
            openCreate: true,
        })
    }

    handleCloseCreate() {
        this.setState({
            openCreate: false,
        })
    }

    render() {
        const { classes } = this.props;
        const { projectItem } = this.props;
        const { open, scroll, task, openAdd, openAddPrevious, loginRole } = this.state;
        let members = projectItem.members;
        let tasks = projectItem.tasks;
        const tabs = [
            {
                name: "Complete Task",
                component: CompleteTasks,
            },
            {
                name: "Assign Task",
                component: AssignTasks,
            }
        ]
        // if (this.state.loading) {
        //     // return <Loading />
        //     return null;
        // }
        return (
            <React.Fragment>
                {/* <SpeedDialTooltipOpen openCreate={this.handleOpenCreate} stylesSpeedDial={classes.speedDial} /> */}
                <div className={classes.root}>
                    <div className={classes.header}>
                        <div className={classes.header_section}>
                            <NewTask loadTasks={this.loadTasks} loadProject={this.props.loadProject} openCreate={this.state.openCreate} handleCloseCreate={this.handleCloseCreate} />
                        </div>
                        <div className={classes.header_section}>
                            <CenteredTabs projectTasks={this.state.projectTasks} handleChange={this.handleChangeTabs} value={this.state.value} tabs={tabs} />
                        </div>
                        <div className={classes.header_section}>
                            {/* Change mode */}
                            <Button onClick={this.handleOpenCreate} size="medium" color="primary" variant="contained" className={classes.buttonAdd}>
                                <AddIcon className={classes.addIcon} style={{ fontSize: 20 }} />
                                        New Task
                            </Button>
                        </div>
                    </div>
                    <div className={classes.content}>
                        <SwipeableViews
                            axis={'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                            style={{
                                minHeight: '100%',
                                overflow: 'hidden'
                            }}
                            slideStyle={{
                                minHeight: '100%',
                            }}
                        >
                            {
                                tabs.map((tab, key) => (
                                    <TabPanel key={key} value={this.state.value} index={key} className={classes.tabpanel}>
                                        <tab.component loadTasks={this.loadTasks} openForm={this.openForm} />
                                    </TabPanel>
                                ))
                            }
                        </SwipeableViews>
                    </div>
                </div>
                <Dialog
                    open={open}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                // disableBackdropClick
                // disableEscapeKeyDown
                >
                    <DialogTitle id="scroll-dialog-title">Task</DialogTitle>
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
                                    value={task.title}
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
                                    value={task.description}
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
                                <Grid item xs={10}>
                                    <div>
                                        <Button onClick={this.handleOpenAdd} size="medium" color="primary" className={classes.icon_add}><AddIcon /></Button>
                                        {task.employeeAssignee !== null ? (
                                            <TagMember member={members.find((member) => {
                                                return member.id == task.employeeAssignee;
                                            })} removeMember={this.removeAssignee} />
                                        ) : null}
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="state-label">State</InputLabel>
                                    <Select
                                        labelId="state-label"
                                        id="state"
                                        name="state"
                                        value={task.state != 0 ? TASK_STATE.indexOf(task.state) : 0}
                                        onChange={this.handleSelectStateChange}
                                    >
                                        {
                                            TASK_STATE.map((state, index) => {
                                                if (task.state === 'DONE' || task.state === 'FINISH') {
                                                    return (
                                                        <MenuItem key={index} value={index}>{state}</MenuItem>
                                                    )
                                                } else if (state !== 'FINISH') {
                                                    return (
                                                        <MenuItem key={index} value={index}>{state}</MenuItem>
                                                    )
                                                }
                                            }
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Point</Typography>
                                    {() => {
                                        console.log("[ProjectTasks][View] Condition open point ", task.state !== 'DONE' && task.state !== 'FINISH' && (loginAsAdmin(loginRole) || loginAsLead(loginRole)), "task state", task)
                                    }}
                                    <StyledRating
                                        readOnly={task.state !== 'DONE' && task.state !== 'FINISH' && (loginAsAdmin(loginRole) || loginAsLead(loginRole))}
                                        name="customized-color"
                                        value={task.point}
                                        getLabelText={getLabelText}
                                        precision={1}
                                        icon={<FiberManualRecordIcon fontSize="inherit" />}
                                        onChange={(event, newValue) => {
                                            this.handlePointChange(event, newValue);
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    required
                                    disableToolbar
                                    variant="inline"
                                    format="dd-MM-yyyy"
                                    label="Start Time"
                                    value={task.startedAt}
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
                                        value={task.duration}
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
                        <Button onClick={this.handleClose} className={classes.button}>
                            Close
            </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleSubmit}
                        >
                            Update
            </Button>
                    </DialogActions>
                </Dialog>
                <Dialog onClose={this.handleCloseAdd} aria-labelledby="simple-dialog-title" open={openAdd}>
                    <DialogTitle id="simple-dialog-title">Select employee</DialogTitle>
                    <List>
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
ProjectTasks.propTypes = {
    classes: PropTypes.object.isRequired,
    projectItem: PropTypes.object.isRequired,
    loadProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        projectItem: state.project.projectItem,
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
        loginRole: state.auth.loginRole,
        projectTasks: state.tasks.projectTasks,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProjectTasks: (projectTasks) => dispatch(updateProjectTasks(projectTasks)),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(ProjectTasks)));