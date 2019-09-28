import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImageAvatars from './ImageAvatars'
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import EditStaff from './EditStaff'
const useStyles = makeStyles({
  card: {
    minWidth: 275,
    width : "60%",
    marginLeft :"20%",
    marginRight : "20%",
    marginTop : "5%",
    textAlign : "center"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
  }

});

export default function Infomation() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Information Staff
        </Typography>
        <ImageAvatars/>
        <div>
            <FormControl>
            <InputLabel htmlFor="my-input">Name</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Phone</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            </div>
            <div>
            <FormControl>
            <InputLabel htmlFor="my-input">ID</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            </div>
            <div>
            <FormControl>
            <InputLabel htmlFor="my-input">Position</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Bank ID</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            </div>
            <div>
            <FormControl>
            <InputLabel htmlFor="my-input">Local Bank</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Birth</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            </div>
      </CardContent>
      <CardActions>
        {/* <Button size="small" className={classes.buttonSubmit}>Edit</Button> */}
        <EditStaff className={classes.buttonSubmit}/>
      </CardActions>
    </Card>
  );
}