import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAlert } from 'react-alert'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CKEditor from 'ckeditor4-react';

import { create } from '../../action/project';
import { DialogTitleCustom } from '../../components'
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

});
class NewProject extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
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
    // console.log("[NewProject] " + evt.editor.getData())
    this.setState(prevState => {
      let request = Object.assign({}, prevState.request);
      request["description"] = evt.editor.getData();
      return { request };
    });
    // console.log("[NewProject] " + this.state.request.description);
  }

  handleSubmit() {
    const { alert } = this.props;
    const { currentUser, handleToProject } = this.props;
    const request = {
      title: this.state.request.title,
      description: this.state.request.description,
      employeeId: currentUser.id
    }
    console.log("Request create project : " + JSON.stringify(request));
    create(request)
      .then(response => {
        console.log(response);
        this.setState({
          open: false,
          request: {
            title: "",
            description: "",
          }
        })
        handleToProject(response)
      }).catch(error => {
        console.log(error);
        //(error && error.message) || 
        alert.error('Oops! Something went wrong. Please try again!');
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
      request: {
        title: "",
        description: "",
      }
    })
  }

  render() {
    const { classes } = this.props;
    const { open, request, scroll } = this.state;
    return (
      <React.Fragment>
        <Button onClick={this.handleOpen} size="medium" color="primary" variant="contained" className={classes.buttonAdd}>
          <AddIcon className={classes.addIcon} style={{ fontSize: 20 }} />
          New project
        </Button>
        <Dialog
          open={open}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitleCustom id="customized-dialog-title" onClose={this.handleClose} style={{
            paddingBottom: '25px',
          }}>New project</DialogTitleCustom>
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
              {/* <Grid item xs={12}>
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
              </Grid> */}
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
      </React.Fragment>
    );
  }
}
NewProject.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  currentRole: PropTypes.array.isRequired,
  handleToProject: PropTypes.func.isRequired,
};
export default withStyles(styles)(withAlert()(NewProject));