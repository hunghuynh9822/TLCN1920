import React, { Component } from 'react';

import Link from '@material-ui/core/Link';

import styles from '../assets/css/notfound.css';

class NoMatch extends Component{
  render(){
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
export default NoMatch;