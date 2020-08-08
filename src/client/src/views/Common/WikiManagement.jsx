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
import { TreeViewCustom, TreeViewCustomAnimation, DropdownTree, DialogTitleCustom, TagProject } from '../../components';
//
import { create, getWikiByPath, update } from '../../action/wiki.js';
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
        // backgroundColor: 'white',
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
    },
    label: {
        margin: 0,
        width: '100px',
        // lineHeight: '40px',
    },
    float_right: {
        flexBasis: "20%"
    }
});
class WikiManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isEdit: false,
            scroll: 'body',
            request: {
                title: "",
                content: "",
                projectId: null,
                createdUser: null,
                path: ""
            },
            selected: null,
            handleReloadData: undefined
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.handleSaveChange = this.handleSaveChange.bind(this);
    }

    handleSelectItem(item, handleReloadData) {
        console.log("[WikiManagement] Select item " + JSON.stringify(item));
        this.setState({
            selected: item,
            handleReloadData: handleReloadData,
            isEdit: false,
        })
    }

    handleClick() {
        const { currentUser } = this.props;
        console.log("[WikiManagement] Click button on header");
        const selected = this.state.selected;
        if (selected) {
            const request = {
                id: selected.id,
                title: selected.title,
                content: selected.content,
                createdUser: currentUser.id,
                projectId: selected.projectId,
                path: selected.path
            }
            this.setState({
                isEdit: true,
                request: request
            })
        }
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

    removeSelected() {
        this.setState({
            selected: null
        })
    }

    handleSaveChange() {
        const { handleReloadData } = this.state;
        const { alert } = this.props;
        const request = this.state.request;
        console.log("[WikiManagement] Request update wiki : " + JSON.stringify(request));
        update(request)
            .then(response => {
                if (handleReloadData != undefined) {
                    handleReloadData();
                }
                this.setState({
                    isEdit: false,
                    selected: request,
                    request: {
                        id: null,
                        title: "",
                        content: "",
                        projectId: null,
                        createdUser: null,
                        path: ""
                    }
                })
            }).catch(error => {
                this.setState({
                    isEdit: false,
                    selected: null,
                    request: {
                        id: null,
                        title: "",
                        content: "",
                        projectId: null,
                        createdUser: null,
                        path: ""
                    }
                })
                console.log(error);
                alert.error('Oops! Something went wrong when create wiki. Please call check!');
            });
    }

    handleSubmit() {
        const { alert } = this.props;
        const { currentUser } = this.props;
        const { handleReloadData } = this.state;
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
        // getWikiByPath("/")
        //     .then(response => {
        //         this.setState({
        //             data_wiki: response
        //         })
        //     }).catch(error => {
        //         console.log(error);
        //         alert.error('Oops! Something went wrong when get wiki with path /. Please call check!');
        //     });
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
        if (this.state.isEdit) {
            return (
                <div>
                    <CKEditor
                        data={content}
                        onChange={this.onEditorChange}
                    />
                </div>
            )
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
                    <Grid item xs={3} sm={3}><TreeViewCustomAnimation handleSelectItem={this.handleSelectItem} isCreate={this.state.open} isEdit={this.state.isEdit} /></Grid>
                    <Grid item xs={9} sm={9}>
                        <div className={classes.sub_layout_header}>
                            <div className={classes.sub_header}>
                                <div className={classes.sub_header_section}>
                                    {/* <Button onClick={this.handleClick} variant="contained" size="medium" color="primary" className={classNames(classes.margin, classes.button)}>
                                        Left
                                    </Button> */}
                                    {this.state.isEdit ? (
                                        <TextField
                                            id="title"
                                            name="title"
                                            label="Title"
                                            required
                                            fullWidth
                                            placeholder="Title"
                                            autoComplete="title"
                                            value={request.title}
                                            onChange={this.handleInputChange}
                                            style={{
                                                marginTop: '-10px'
                                            }}
                                        />
                                    ) : (
                                            <div className={classes.wiki_title}>
                                                {this.state.selected == null ? "Select wiki" : this.state.selected.title}
                                            </div>
                                        )}
                                </div>
                                <div className={classes.sub_header_section}>
                                    {/* Center */}
                                </div>
                                {this.state.isEdit ? (
                                    <div className={classNames(classes.sub_header_section, classes.float_right)}>
                                        <Button onClick={this.handleSaveChange} variant="contained" size="medium" className={classNames(classes.margin, classes.button)}>
                                            <CreateIcon style={{ fontSize: 20 }} />
                                           Save change
                                        </Button>
                                    </div>
                                ) : (
                                        <div className={classes.sub_header_section}>
                                            <Button onClick={this.handleOpen} variant="contained" size="medium" color="primary" className={classNames(classes.margin, classes.button, classes.button_create)}>
                                                <AddIcon style={{ fontSize: 20 }} />
                                                Create Wiki
                                            </Button>
                                            {this.state.selected && (
                                                <Button onClick={this.handleClick} variant="contained" size="medium" className={classNames(classes.margin, classes.button)}>
                                                    <CreateIcon style={{ fontSize: 20 }} />
                                                    Edit
                                                </Button>
                                            )}
                                        </div>
                                    )}
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
                    <DialogTitleCustom id="customized-dialog-title" onClose={this.handleClose} style={{
                        paddingBottom: '25px',
                    }}>New wiki</DialogTitleCustom>
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                            }}>
                                <div className={classes.label}>Parent : </div>
                                {/* <div><DropdownTree /></div> */}
                                <div>{this.state.selected && this.state.selected != null ? (<TagProject project={this.state.selected} removeProject={this.removeSelected} />) : "No parent"}</div>
                            </Grid>
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
                                <p>Content</p>
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