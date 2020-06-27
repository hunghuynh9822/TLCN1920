import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';

// import styles from '../assets/css/notfound.css';

const styles = theme => ({
  notfound_page: {
    position: 'relative',
    height: '100vh',
  },
  notfound_content: {
    "position": "absolute",
    "left": "50%",
    "top": "50%",
    "WebkitTransform": "translate(-50%, -50%)",
    "MsTransform": "translate(-50%, -50%)",
    "transform": "translate(-50%, -50%)",
    "maxWidth": "920px",
    "width": "100%",
    "lineHeight": "1.4",
    "textAlign": "center",
    "paddingLeft": "15px",
    "paddingRight": "15px",
    "& h2": { "fontFamily": "'Maven Pro', sans-serif", "fontSize": "46px", "color": "#000", "fontWeight": "900", "textTransform": "uppercase", "margin": "0px" },
    "& p": { "fontFamily": "'Maven Pro', sans-serif", "fontSize": "16px", "color": "#000", "fontWeight": "400", "textTransform": "uppercase", "marginTop": "15px" },
    "& a": { "fontFamily": "'Maven Pro', sans-serif", "fontSize": "14px", "textDecoration": "none", "textTransform": "uppercase", "background": "#189cf0", "display": "inline-block", "padding": "16px 38px", "border": "2px solid transparent", "borderRadius": "40px", "color": "#fff", "fontWeight": "400", "WebkitTransition": "0.2s all", "transition": "0.2s all", "&:hover": { "backgroundColor": "#fff", "borderColor": "#189cf0", "color": "#189cf0" } },
  },
  notfound404: {
    "position": "absolute",
    "height": "100px",
    "top": "0",
    "left": "50%",
    "WebkitTransform": "translateX(-50%)",
    "MsTransform": "translateX(-50%)",
    "transform": "translateX(-50%)",
    "zIndex": "-1",
    "& h1": { "fontFamily": "'Maven Pro', sans-serif", "color": "#ececec", "fontWeight": "900", "fontSize": "276px", "margin": "0px", "position": "absolute", "left": "50%", "top": "50%", "WebkitTransform": "translate(-50%, -50%)", "MsTransform": "translate(-50%, -50%)", "transform": "translate(-50%, -50%)" }
  }
})

class NoMatch extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.notfound_page}>
        <div className={classes.notfound_content}>
          <div className={classes.notfound404}>
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
export default withStyles(styles)(NoMatch);
