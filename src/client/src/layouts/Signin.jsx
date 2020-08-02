import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import { withAlert } from 'react-alert'

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
// import styles from '../assets/jss/styles/layouts/signinStyles';
import { Copyright } from '../components';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../constants';

import { RequestAddStaff } from "../components"

import googleLogo from '../assets/img/google-logo.png';

import { login, authenticate } from '../action/auth';

import { Background } from '../components'
const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    to_new: {
        margin: theme.spacing(0, 0, 2),
    },
    orSeparator: {
        textAlign: 'center',
    },
    socialLogin: {

    },
    socialBtn: {
        width: '100%',
        marginBottom: '15px',
        fontWeight: 400,
        fontSize: '16px',
    },
    socialBtnText: {
        marginTop: '5px',
        marginBottom: '5px',
    },
    socialImg: {
        height: '32px',
        float: 'left',
        marginTop: '5px',
        marginBottom: '5px',
    },
    google: {
        marginTop: '7px',
        backgroundColor: '#fafafa'
    },
    new_employee: {
        width: '100%',
    }
});

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneOrEmail: '',
            password: '',
            error: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToNew = this.handleToNew.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { alert } = this.props;
        const loginRequest = Object.assign({}, { phoneOrEmail: this.state.phoneOrEmail, password: this.state.password });
        login(loginRequest)
            .then(response => {
                // console.log(response.tokenType);
                this.props.authenticate(true, null);
                localStorage.setItem(ACCESS_TOKEN, response.tokenType);
                alert.success("You're successfully logged in!", { timeout: 1000, });
                // this.props.history.push("/");
            }).catch(error => {
                console.log(error);
                this.setState({
                    error: error
                })
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
            });
    }

    // renderError() {
    //     const { alert } = this.props;
    //     if (this.state.error) {
    //         alert.error("Failed");
    //         return (
    //             <div>Đăng nhập thất bại</div>
    //         )
    //     }
    // }

    handleToNew() {
        console.log("Go to new");
        this.props.history.push("/new");
    }

    render() {
        const { classes } = this.props;
        const { authenticated, currentUser } = this.props;
        if (authenticated) {
            return (
                <Redirect to={{
                    pathname: '/home',
                    state: { from: this.props.location }
                }} />
            )
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
                    {/* {this.renderError()} */}
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <div className="social-login">
                            <Button className={classnames(classes.socialBtn, classes.google)} href={GOOGLE_AUTH_URL}>
                                <img className={classes.socialImg} src={googleLogo} alt="Google" />
                                <span className={classes.socialBtnText}>Log in with Google</span>
                            </Button>
                        </div>
                        <div className={classes.orSeparator}>
                            <span className="orText">OR</span>
                        </div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="phoneOrEmail"
                            label="Phone or Email Address"
                            name="phoneOrEmail"
                            autoComplete="phoneOrEmail"
                            autoFocus
                            value={this.state.phoneOrEmail}
                            onChange={this.handleInputChange}
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
                            value={this.state.password}
                            onChange={this.handleInputChange}
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

                        {/* <div className={classes.orSeparator}>
                            <span className="orText">IF NOT</span>
                        </div> */}
                        <div >
                            <Button fullWidth variant="contained" color="primary" onClick={this.handleToNew} className={classes.to_new}>
                                Register new acount ?
                            </Button>
                        </div>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            
                            <Grid item>
                                <NavLink
                                    to="/new"
                                    variant="body2"
                                >New employee</NavLink>
                            </Grid>
                        </Grid> */}

                    </form>
                </div>
                <Background />
                {/* <Box mt={8}>
                    <Copyright />
                </Box> */}
            </Container>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: state.auth.authenticated,
        currentUser: state.auth.currentUser,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        authenticate: (authenticated, currentUser) => dispatch(authenticate(authenticated, currentUser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(withStyles(styles)(SignIn)));