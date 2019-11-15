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
import Add from '@material-ui/icons/Add';
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

export default function AddTask() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [nametask, setNametask] = React.useState('');
  const handleNametask = event => {
    setNametask(event.target.value);
  }
  const [descript, setDescript] = React.useState('');
  const handleDescript = event => {
    setDescript(event.target.value);
  }

  const [date1, setDate1] = React.useState(new Date());
  const handleDate1 = (date) => {
    setDate1(date);
  }

  const [date2, setDate2] = React.useState(new Date());
  const handleDate2 = (date) => {
    setDate2(date);
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log("day la descript : " + descript);
    console.log("day la ngay : " + date1);
    console.log("day la ngay : " + date1.getTime());

    const date11 = date1;
    const date22 = date2;
    const diffTime = Math.abs(date22 - date11);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log("so ngay "+diffDays);
  }
   
  return (
    <div>
      {/* <Button variant="contained" color="primary"  onClick={handleOpen} className={classes.button}>
        Add Task
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
            <h2 id="spring-modal-title" className={classes.title}>Add Task</h2>
            <div>
            <FormControl className={classes.buttonSubmit}>
            <InputLabel htmlFor="my-input">Description</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" descript="descript" onChange={handleDescript}/>
            </FormControl>
            </div>
            <h4>Time start</h4>
            <div style={{display:'flex'}}>
              <div>
              <MaterialUIPickers getDate={handleDate1}/>
              </div> 
        
            </div>
            <h4>Time end</h4>
            <div style={{display:'flex'}}> 
              <div>
              <MaterialUIPickers getDate={handleDate2}/>
              </div> 
        
            </div>
            <div>
            <Button type="submit" variant="contained" color="primary" className={classnames(classes.button,classes.buttonSubmit)}>
            Add
            </Button>
            </div>   
          </div>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}