import React, { Component } from 'react';

import Link from '@material-ui/core/Link';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from '../assets/css/notfound.css';

const stylesTest = theme => ({
  "notfound__notfound": {
    "position": "absolute",
    "left": "50%",
    "top": "50%",
    "WebkitTransform": "translate(-50%, -50%)",
    "MsTransform": "translate(-50%, -50%)",
    "transform": "translate(-50%, -50%)"
  },
});

class NoMatch extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div id={styles.notfound}>
        <div className={styles.notfound}>
          <div className={styles.notfound404}>
            <h1>404</h1>
          </div>
          <h2>We are sorry, Page not found!</h2>
          <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
          <Link href="/">Back To Homepage</Link>
        </div>
      </div>
    );
  }
}
NoMatch.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(stylesTest)(NoMatch);