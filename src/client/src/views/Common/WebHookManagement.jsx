import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import Switch from '@material-ui/core/Switch';
//
import { MaterialTable } from '../../components';
const styles = theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        margin: theme.spacing(4),
        display: 'flex',
        flexWrap: 'nowrap',
    },
    form: {
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    };

    handleChange(event) {
        const { name, checked } = event.target;
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request[name] = checked;
            return { request };
        })
    }
    render() {
        const { classes } = this.props;
        const { request } = this.state;
        return (
            <React.Fragment>
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
                                <div className={classes.labelName}>Bot token : </div>
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
                                        Placeholder
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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
                        </Grid>
                    </div>
                    <div className={classes.table_view}>
                        <MaterialTable />
                    </div>
                </div>
            </React.Fragment >
        );
    }
}
WikiManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(WikiManagement);