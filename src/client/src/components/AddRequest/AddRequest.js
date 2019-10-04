/* eslint-disable react/prop-types */

import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MaterialUIPickers from './MaterialUIPickers'
import Hour from './hour'

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
  input: {
    marginLeft: "80px"
  },
  buttonSubmit: {
    marginTop: "20px",
    width: "30%",
    marginLeft: "35%",
    marginRight: "35%", 
  },
  title:{
    textAlign: "center"
  },
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

export default function AddRequest() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button variant="contained" color="primary"  onClick={handleOpen} className={classes.button}>
        Xin Phep
      </Button>
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
          <div className={classes.paper}>
            <h2 id="spring-modal-title" className={classes.title}>Request Form</h2>
            <h4>Time start</h4>
            <div style={{display:'flex'}}>
              <div>
              <MaterialUIPickers />
              </div> 
            <div style={{marginLeft:'10px'}}>
            <Hour/>
            </div>
            </div>
            <h4>Time end</h4>
            <div style={{display:'flex'}}> 
              <div>
              <MaterialUIPickers />
              </div> 
            <div style={{marginLeft:'10px'}}>
            <Hour/>
            </div>
            </div>
            <div>
            <FormControl className={classes.buttonSubmit}>
            <InputLabel htmlFor="my-input">Reson</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            </div>
            <div>
            <Button variant="contained" color="primary" className={classnames(classes.button,classes.buttonSubmit)}>
            Submit
            </Button>
            </div>   
          </div>
        </Fade>
      </Modal>
    </div>
  );
}