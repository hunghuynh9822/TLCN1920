import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/styles/layouts/signinStyles';
import { Copyright } from '../components';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../constants';

import googleLogo from '../assets/img/google-logo.png';
class SignIn extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const { authenticated, roles } = this.props;
        if (authenticated && roles) {
            console.log(authenticated);
            console.log(roles);
            if (authenticated) {
                let index = roles[0];
                let maxRole = roles.filter((role) => role.id <= index.id);
                switch (maxRole[0].id) {
                    case 1:
                        return <Redirect to={{
                            pathname: "/admin",
                            state: { from: this.props.location }
                        }} />;
                    case 2:
                        return <Redirect to={{
                            pathname: "/staff",
                            state: { from: this.props.location }
                        }} />;
                    case 3:
                        return <Redirect to={{
                            pathname: "/lead",
                            state: { from: this.props.location }
                        }} />;
                    case 4:
                        return <Redirect to={{
                            pathname: "/hr",
                            state: { from: this.props.location }
                        }} />;
                }
            }
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <div className={classes.orSeparator}>
                            <span className="orText">OR</span>
                        </div>
                        <div className="social-login">
                            <Button className={classnames(classes.socialBtn, classes.google)} href={GOOGLE_AUTH_URL}>
                                <img className={classes.socialImg} src={googleLogo} alt="Google" />
                                <span className={classes.socialBtnText}>Log in with Google</span>
                            </Button>
                        </div>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}
SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignIn);