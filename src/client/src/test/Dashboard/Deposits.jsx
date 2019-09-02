/* eslint-disable no-script-url */

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Title from './Title.jsx';

const styles = () => ({
  depositContext: {
    flex: 1,
  },
});
class Deposits extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="javascript:;">
          View balance
        </Link>
      </div>
    </React.Fragment>
    );
  }
}
Deposits.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Deposits);