/* eslint-disable react/prop-types */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import PersonIcon from '@material-ui/icons/Person';
import Add from '@material-ui/icons/Add';
import clsx from 'clsx';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input :{
    marginLeft : "10px"
  },
  buttonSubmit: {
    marginTop: "20px",
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%", 
  },
  title:{
    textAlign: "center"
  }
}));





const Fade = React.forwardRef(function Fade(props, ref) {

  
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function AddStafftoProject() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [title, setTitle] = React.useState('');
  const handleTitle = event => {
    setTitle(event.target.value);
  }
  const [employeeid, setEmployeeid] = React.useState('');
  const handleEmployeeid = event => {
    setEmployeeid(event.target.value);
  }
  
  const handleSubmit = event => {
    event.preventDefault();
  
    // const title = {
    //   title: this.state.title
    // };
    // const employeeid = {
    //   employeeid: this.state.employeeid
    // };
    axios.post(`http://localhost:8080/promicro/create`, { title , employeeid })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  return (
    <div>
      {/* <Button variant="contained" color="primary"  onClick={handleOpen} className={classes.button}>
        Settings
      </Button> */}
       <Add onClick={handleOpen}/> 
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <form onSubmit={handleSubmit}>
          <div className={classes.paper}>
            <h3 id="spring-modal-title" className={classes.title}>New Project</h3>
            <div>
            <FormControl>
            <InputLabel htmlFor="my-input">Name project</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" title="title" onChange={handleTitle}/>
            </FormControl>
            </div>
            <div>
            <FormControl>
            <InputLabel htmlFor="my-input">Descriptions</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" employeeid="employeeid" onChange={handleEmployeeid}/>
            </FormControl>
            </div>
            <h6>Procject Admin</h6>
            <div>           
            <Fab color="primary" size="small" aria-label="add" className={classes.fab}><AddIcon /></Fab>
            {/* <Fab variant="extended" size="small" aria-label="delete" className={classnames(classes.fab,classes.input)}><PersonIcon className={classes.extendedIcon} />Liem</Fab>
            <Fab variant="extended" size="small" aria-label="delete" className={classnames(classes.fab,classes.input)}><PersonIcon className={classes.extendedIcon} />Liem</Fab>             */}
            </div>
            <h6>Procject Member</h6>
            <div>           
            <Fab color="primary" size="small" aria-label="add" className={classes.fab}><AddIcon /></Fab>
            {/* <Fab variant="extended" size="small" aria-label="delete" className={classnames(classes.fab,classes.input)}><PersonIcon className={classes.extendedIcon} />Liem</Fab>
            <Fab variant="extended"  size="small" aria-label="delete" className={classnames(classes.fab,classes.input)}><PersonIcon className={classes.extendedIcon} />Liem</Fab>             */}
            </div>

            <div>
            <Button variant="contained" size="small" type="submit" className={classnames(classes.button,classes.buttonSubmit)}>
            ADD
            </Button>
            </div>
          </div>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}