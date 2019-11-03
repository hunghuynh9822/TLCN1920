const signinStyle = theme => ({
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
    }
});
export default signinStyle;