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
import { TreeViewCustom, TreeViewCustomAnimation } from '../../components';
//
import { create, getWikiByPath } from '../../action/wiki.js';
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
    paperWidthSm: {
        maxWidth: 1000,
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
    wiki_title: {
        fontSize: '23px',
        fontWeight: '500'
    }
});
class WikiManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'body',
            request: {
                title: "",
                content: "",
                projectId: null,
                createdUser: null,
                path: ""
            },
            selected: null,
            data_wiki: new Array()
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    handleSelectItem(item) {
        console.log("[WikiManagement] Select item " + JSON.stringify(item));
        this.setState({
            selected: item
        })
    }

    handleClick() {
        console.log("[WikiManagement] Click button on header");
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
                content: "",
                projectId: null,
                createdUser: null,
                path: ""
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
            request["content"] = evt.editor.getData();
            return { request };
        });
    }

    handleSubmit() {
        const { alert } = this.props;
        const { currentUser } = this.props;
        let selected = this.state.selected;
        let path = "/";
        let projectId = null;
        if (selected && selected != null) {
            path = selected.path + selected.id + "/";
            projectId = selected.projectId;
        }
        const request = {
            title: this.state.request.title,
            content: this.state.request.content,
            createdUser: currentUser.id,
            projectId: projectId,
            path: path
        }
        console.log("[WikiManagement] Request create wiki : " + JSON.stringify(request));
        create(request)
            .then(response => {
                getWikiByPath("/")
                    .then(response_wiki => {
                        this.setState({
                            open: false,
                            request: {
                                title: "",
                                content: "",
                                projectId: null,
                                createdUser: null,
                                path: ""
                            },
                            data_wiki: response_wiki
                        })
                    }).catch(error => {
                        this.setState({
                            open: false,
                            request: {
                                title: "",
                                content: "",
                                projectId: null,
                                createdUser: null,
                                path: ""
                            },
                        })
                        console.log(error);
                        alert.error('Oops! Something went wrong when get wiki with path /. Please call check!');
                    });
            }).catch(error => {
                this.setState({
                    open: false,
                    request: {
                        title: "",
                        content: "",
                        projectId: null,
                        createdUser: null,
                        path: ""
                    },
                })
                console.log(error);
                alert.error('Oops! Something went wrong when create wiki. Please call check!');
            });
    }

    componentDidMount() {
        const { alert } = this.props;
        getWikiByPath("/")
            .then(response => {
                this.setState({
                    data_wiki: response
                })
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong when get wiki with path /. Please call check!');
            });
    }

    truncate(str, n, useWordBoundary) {
        if (str.length <= n) { return str; }
        const subString = str.substr(0, n - 1); // the original check
        return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(" "))
            : subString) + " ...";
    };

    renderContent(wiki) {
        { this.state.selected == null ? "Select wiki" : this.state.selected.content }
        let content = "No content";
        if (wiki != null) {
            content = wiki.content;
        }
        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: content }} ></div>
            </div>
        )
    }

    render() {
        const { classes } = this.props;
        const { open, request, scroll } = this.state;
        return (
            <React.Fragment>
                <Grid container spacing={3} className={classes.wiki_page}>
                    <Grid item xs={3} sm={3}><TreeViewCustomAnimation handleSelectItem={this.handleSelectItem} isCreate={this.state.open} data={this.state.data_wiki} /></Grid>
                    <Grid item xs={9} sm={9}>
                        <div className={classes.sub_layout_header}>
                            <div className={classes.sub_header}>
                                <div className={classes.sub_header_section}>
                                    {/* <Button onClick={this.handleClick} variant="contained" size="medium" color="primary" className={classNames(classes.margin, classes.button)}>
                                        Left
                                    </Button> */}
                                    <div className={classes.wiki_title}>
                                        {this.state.selected == null ? "Select wiki" : this.state.selected.title}
                                    </div>
                                </div>
                                <div className={classes.sub_header_section}>
                                    {/* Center */}
                                </div>
                                <div className={classes.sub_header_section}>
                                    <Button onClick={this.handleOpen} variant="contained" size="medium" color="primary" className={classNames(classes.margin, classes.button, classes.button_create)}>
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
                            {this.renderContent(this.state.selected)}
                        </div>
                    </Grid>
                </Grid>
                <Dialog
                    open={open}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                    classes={{
                        paperWidthSm: classes.paperWidthSm
                    }}
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
                                <p>Centent</p>
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