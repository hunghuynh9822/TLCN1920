import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Add from '@material-ui/icons/Add';
const useStyles = makeStyles({
  card: {
    width: '245px',
    height: '50px',
    margin: '0px 10px',
    position: 'relative'
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
    
    width: "100%",

  },
  title:{
    textAlign: "center"
  }

});

export default function NewProject() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardActions>
        <Button size="small" className={classes.buttonSubmit}><Add/>New project</Button>
      </CardActions>
    </Card>
  );
}