import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAlert } from 'react-alert'
//
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
//
import { MaterialTable, Loading } from '../../components';
//
import { getAllProjectNames } from '../../action/project'
import { create, update, deleteWebHook, getAllWebHook } from '../../action/webhook'

const styles = theme => ({
    paper: {
        backgroundColor: 'transparent',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        // margin: theme.spacing(4),
        display: 'flex',
        flexWrap: 'nowrap',
    },
    form: {
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 2),
    },
    flexContainer: {
        display: "flex",
        flexWrap: "nowrap",
    },
    labelName: {
        marginTop: 5,
        width: 100
    },
    input: {
        marginLeft: 10
    },
    settings: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    table_view: {
        margin: '0px 0px 0px 20px',
        width: '70%'
    },
    buttonAction: {
        float: 'right'
    }
});
class WikiManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: {
                idPro: 0,
                name: "",
                botToken: "",
                chatId: "",
                createTask: false,
                updateTask: false,
                updateState: false
            },
            loading: false,
            action: "",
            projects: new Array(),
            data: new Array(),
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Project', field: 'namePro' },
                { title: 'Chat id', field: 'chatId' },
                { title: 'Bot token', field: 'botToken' },
            ],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectData = this.handleSelectData.bind(this);
        this.reload = this.reload.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request[name] = value;
            return { request };
        })
    }
    handleChangeSelect(event) {
        const { name, value } = event.target;
        console.log("[WebHook] Select project ", value);
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request['idPro'] = value;
            return { request };
        })
    };

    handleChange(event) {
        const { name, checked } = event.target;
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request[name] = checked;
            return { request };
        })
    }

    handleSelectData(webHook, isEdit) {
        this.setState({
            action: isEdit ? "Update" : "",
            request: {
                id: webHook.id,
                idPro: webHook.idPro,
                name: webHook.name,
                botToken: webHook.botToken,
                chatId: webHook.chatId,
                createTask: webHook.createTask,
                updateTask: webHook.updateTask,
                updateState: webHook.updateState
            },
        });
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })
        this.reload();
    }

    reload() {
        const { alert } = this.props;
        this.setState({
            action: "Create",
            projcets: new Array(),
            request: {
                idPro: 0,
                name: "",
                botToken: "",
                chatId: "",
                createTask: false,
                updateTask: false,
                updateState: false
            },
        });
        getAllWebHook()
            .then(webHooks => {
                getAllProjectNames()
                    .then(response => {
                        console.log("[WebHook] Get project name ", response);
                        let projects = response.projects;
                        let data = webHooks.webHookReponseList.map((webHook, index) => {
                            let idPro = webHook.idPro
                            let projectDetail = projects.find(project => {
                                return project.id == idPro;
                            });
                            webHook.namePro = projectDetail.title;
                            return webHook;
                        })
                        console.log("[WebHook] Data webHook ", data);
                        this.setState({
                            projects: projects,
                            data: data,
                            loading: false,
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        alert.error('Oops! Something went wrong when get list webhook data. Please try again!');
                    })
            })
            .catch(error => {
                console.log(error)
                alert.error('Oops! Something went wrong when get list name project. Please try again!');
            })
    }

    handleDelete(webHookId) {
        deleteWebHook(webHookId)
            .then(response => {
                console.log("[WebHook] Delete webhook ", response);
                this.reload();
            })
            .catch(error => {
                console.log(error)
                alert.error('Oops! Something went wrong when delete web hook. Please try again!');
            })
    }

    handleSubmit(event) {
        const { alert } = this.props;
        const { request } = this.state;
        event.preventDefault();
        console.log("[WebHook] Submit ", request)
        if (this.state.action == 'Create') {
            create(request)
                .then(response => {
                    console.log("[WebHook] Create webhook ", response);
                    this.reload();
                })
                .catch(error => {
                    console.log(error)
                    alert.error('Oops! Something went wrong when create web hook. Please try again!');
                })
        } else if (this.state.action == 'Update') {
            update(request)
                .then(response => {
                    console.log("[WebHook] Update webhook ", response);
                    this.reload();
                })
                .catch(error => {
                    console.log(error)
                    alert.error('Oops! Something went wrong when update web hook. Please try again!');
                })
        } else {
            alert.error('Oops! Action undefine ' + this.state.action + '. Please try again!');
        }

    }

    render() {
        const { classes } = this.props;
        const { request } = this.state;
        console.log("Action : " + this.state.action)
        return (
            <React.Fragment>
                {this.state.loading ? <Loading /> : (
                    <div className={classes.paper}>
                        <div className={classes.form}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} classes={{
                                    root: classes.flexContainer
                                }}>
                                    <div className={classes.labelName}>Name : </div>
                                    <TextField
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="Enter name of notify..."
                                        value={request.name}
                                        onChange={this.handleInputChange}
                                        classes={{
                                            root: classes.input
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} classes={{
                                    root: classes.flexContainer
                                }}>
                                    <div className={classes.labelName}>Bot token : </div>
                                    <TextField
                                        id="botToken"
                                        name="botToken"
                                        required
                                        placeholder="Enter your bot token..."
                                        value={request.botToken}
                                        onChange={this.handleInputChange}
                                        classes={{
                                            root: classes.input
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} classes={{
                                    root: classes.flexContainer
                                }}>
                                    <div className={classes.labelName}>Chat id : </div>
                                    <TextField
                                        id="chatId"
                                        name="chatId"
                                        required
                                        placeholder="Enter your chat id..."
                                        value={request.chatId}
                                        onChange={this.handleInputChange}
                                        classes={{
                                            root: classes.input
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} classes={{
                                    root: classes.flexContainer
                                }}>
                                    <div className={classes.labelName}>Project : </div>
                                    <Select
                                        value={request.idPro}
                                        onChange={this.handleChangeSelect}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        className={classes.input}
                                    >
                                        <MenuItem value={0} disabled>
                                            Select project
                                    </MenuItem>
                                        {this.state.projects.map((value, index) => {
                                            return (
                                                <MenuItem key={value.id} value={value.id}>{value.title}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} classes={{
                                    root: classes.flexContainer
                                }}>
                                    <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.settings}>
                                        <ListItem>
                                            {/* <ListItemIcon>
                                            <WifiIcon />
                                        </ListItemIcon> */}
                                            <ListItemText id="switch-list-label-create-task" primary="Create task" />
                                            <ListItemSecondaryAction>
                                                <Switch
                                                    edge="end"
                                                    checked={this.state.request.createTask}
                                                    onChange={this.handleChange}
                                                    color="primary"
                                                    name="createTask"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            {/* <ListItemIcon>
                                            <BluetoothIcon />
                                        </ListItemIcon> */}
                                            <ListItemText id="switch-list-label-update-task" primary="Update task" />
                                            <ListItemSecondaryAction>
                                                <Switch
                                                    edge="end"
                                                    checked={this.state.request.updateTask}
                                                    onChange={this.handleChange}
                                                    color="primary"
                                                    name="updateTask"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            {/* <ListItemIcon>
                                            <BluetoothIcon />
                                        </ListItemIcon> */}
                                            <ListItemText id="switch-list-label-update-state" primary="Update state" />
                                            <ListItemSecondaryAction>
                                                <Switch
                                                    edge="end"
                                                    checked={this.state.request.updateState}
                                                    onChange={this.handleChange}
                                                    color="primary"
                                                    name="updateState"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </Grid>
                                {this.state.action == "" ? null : (
                                    <Grid item xs={12} >
                                        <Button onClick={this.handleSubmit} size="medium" color="primary" variant="contained" className={classes.buttonAction}>
                                            {this.state.action}
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </div>

                        <div className={classes.table_view}>
                            <MaterialTable title={'Webhook'} columns={this.state.columns} data={this.state.data} handleSelectData={this.handleSelectData} onDelete={this.handleDelete} />
                        </div>
                    </div>
                )}
            </React.Fragment >
        );
    }
}
WikiManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(withAlert()(WikiManagement));