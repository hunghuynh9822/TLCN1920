import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import { NewTask, Loading } from '../../../components';
import { AssignTasks, CompleteTasks } from '../../';

import { getTasksByAdmin, getTasksCreatedByLead, TASK_STATE, updateStateTasks } from '../../../action/task';
import { loginAsAdmin, loginAsLead, loginAsStaff } from '../../../action/auth';
import { updateCreatorTasks } from '../../../action/task';

import SwipeableViews from 'react-swipeable-views';
import { CenteredTabs, TabPanel } from '../../../components';

import { TagMember } from '../../../components';
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

    },
    tabpanel: {
        overflow: 'hidden',
    },
    //Form
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
});
const CustomSwipeableViews = withStyles(theme => ({
    root: {
        minHeight: '100%',
        overflow: 'hidden',
    }
}))(SwipeableViews);
class ProjectTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            loading: false,
            open: false,
            openAdd: false,
            scroll: 'body',
            task: {
                projectId: null,
                employeeCreator: null,
                employeeAssignee: null,
                title: null,
                description: null,
                startedAt: new Date(),
                duration: null,
                endAt: new Date()
            },
        }
        this.handleChangeTabs = this.handleChangeTabs.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
        this.loadTasks = this.loadTasks.bind(this);
        this.updateTasks = this.updateTasks.bind(this);
        this.openForm = this.openForm.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.getName = this.getName.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleStartedAt = this.handleStartedAt.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeAssignee = this.removeAssignee.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.handleOpenAdd = this.handleOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleSelectStateChange = this.handleSelectStateChange.bind(this);
    }

    handleChangeTabs = (event, newValue) => {
        this.loadTasks();
        this.setState({
            value: newValue,
        })
    }

    handleChangeIndex = index => {
        this.loadTasks();
        this.setState({
            value: index,
        })
    };

    updateTasks(creatorTasks) {
        this.setState({
            creatorTasks: creatorTasks,
        })
    }

    loadTasks() {
        console.log("Loading task");
        this.setState({
            loading: true
        });
        const { alert } = this.props;
        const { loginRole, projectItem, currentUser } = this.props;
        let projectId = projectItem.project.id;
        if (loginAsAdmin(loginRole)) {
            getTasksByAdmin(projectId)
                .then(response => {
                    // console.log("getTasksByAdmin : " + JSON.stringify(response));
                    this.props.updateCreatorTasks(response.creatorTasks);
                    this.setState({
                        loading: false,
                        creatorTasks: response.creatorTasks,
                    })
                })
        } else if (loginAsLead(loginRole)) {
            getTasksCreatedByLead(projectId, currentUser.id)
                .then(response => {
                    // console.log("getTasksCreatedByLead : " + JSON.stringify(response));
                    this.props.updateCreatorTasks(response.creatorTasks);
                    this.setState({
                        loading: false,
                        creatorTasks: response.creatorTasks,
                    })
                })
        } else {
            alert.error('Oops! Something went wrong. Please try again!');
            this.setState({
                loading: false
            })
        }
    }

    componentDidMount() {
        this.loadTasks();
    }

    openForm(task) {
        console.log("OPEN TASK : " + JSON.stringify(task))
        this.setState({
            open: true,
            task: task,
        })
    }

    handleClose() {
        this.setState({
            open: false,
            task: {
                projectId: null,
                employeeCreator: null,
                employeeAssignee: null,
                title: null,
                description: null,
                startedAt: new Date(),
                duration: null,
                endAt: new Date()
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
        const { currentUser } = this.props;
        this.setState({
            task: { ...this.state.task, state: TASK_STATE[event.target.value] }
        });
        let request = {
            taskId: this.state.task.id,
            employeeId: currentUser.id,
            state: TASK_STATE[event.target.value]
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
        const diffTime = Math.abs(date - this.state.request.startedAt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.handleDatePickerChange('duration', diffDays);
        this.handleDatePickerChange('endAt', date);
    }

    handleSubmit() {
        const { alert } = this.props;
        const { currentUser, projectItem } = this.props;
        const { task } = this.state;
        let projectId = projectItem.project.id;
        const request = {
            projectId: projectId,
            employeeCreator: task.employeeCreator,
            employeeAssignee: task.employeeAssignee,
            title: task.title,
            description: task.description,
            state: task.state,
            point: task.point,
            startedAt: task.startedAt,
            duration: task.duration
        }
        console.log("Request update task : " + JSON.stringify(request));
        // create(request)
        //     .then(response => {
        //         console.log(response);
        //         this.props.loadTasks();
        //         this.setState({
        //             open: false,
        //             openAdd: false,
        //             assignee: null,
        //             request: {
        //                 projectId: '',
        //                 employeeCreator: '',
        //                 employeeAssignee: '',
        //                 title: '',
        //                 description: '',
        //                 startedAt: new Date(),
        //                 duration: ''
        //             }
        //         })
        //     }).catch(error => {
        //         console.log(error);
        //         //(error && error.message) || 
        //         alert.error('Oops! Something went wrong. Please try again!');
        //     });
    }

    removeAssignee(member) {
        this.setState({
            task: { ...this.state.task, employeeAssignee: null },
        })
    }

    handleListItemClick(member) {
        this.setState({
            task: { ...this.state.task, employeeAssignee: member.id },
            openAdd: false,
        });
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
        const { open, scroll, task, openAdd } = this.state;
        let members = projectItem.members;
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
                <div className={classes.root}>
                    <div className={classes.header}>
                        <div className={classes.header_section}>
                            <NewTask loadTasks={this.loadTasks} />
                        </div>
                        <div className={classes.header_section}>
                            <CenteredTabs handleChange={this.handleChangeTabs} value={this.state.value} tabs={tabs} />
                        </div>
                        <div className={classes.header_section}>
                            {/* Change mode */}
                        </div>
                    </div>
                    <div className={classes.content}>
                        <CustomSwipeableViews
                            axis={'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            {
                                tabs.map((tab, key) => (
                                    <TabPanel key={key} value={this.state.value} index={key} className={classes.tabpanel}>
                                        <tab.component updateTasks={this.updateTasks} loadTasks={this.loadTasks} creatorTasks={this.state.creatorTasks} openForm={this.openForm} />
                                    </TabPanel>
                                ))
                            }
                        </CustomSwipeableViews>
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
                                        value={TASK_STATE.indexOf(task.state)}
                                        onChange={this.handleSelectStateChange}
                                    >
                                        {
                                            TASK_STATE.map((state, index) => (
                                                state !== 'FINISH' && <MenuItem key={index} value={index}>{state}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Point</Typography>
                                    <StyledRating
                                        name="customized-color"
                                        value={0}
                                        getLabelText={getLabelText}
                                        precision={0.5}
                                        icon={<FiberManualRecordIcon fontSize="inherit" />}
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
                                <DatePicker
                                    required
                                    disableToolbar
                                    variant="inline"
                                    format="dd-MM-yyyy"
                                    label="End Time"
                                    value={task.endAt}
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
                            Update
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
                                <ListItemText primary={this.getName(member)} />
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
ProjectTasks.propTypes = {
    classes: PropTypes.object.isRequired,
    projectItem: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        projectItem: state.project.projectItem,
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
        loginRole: state.auth.loginRole,
        creatorTasks: state.tasks.creatorTasks,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateCreatorTasks: (creatorTasks) => dispatch(updateCreatorTasks(creatorTasks)),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(ProjectTasks)));