import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//
const styles = theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        margin: theme.spacing(4),
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
});
class WikiManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: {
                idPro: null,
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
    }
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request[name] = value;
            return { request };
        })
    }
    handleChangeSelect = (event) => {

    };
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
                                    <MenuItem value="" disabled>
                                        Placeholder
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
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