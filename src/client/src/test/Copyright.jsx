import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const styles = theme => ({
    footer: {
        margin: theme.spacing(3, 0),
        paddingBottom: theme.spacing(1),
        bottom: 0,
        position: 'fixed',
        width: '100%',
        height: 75,
    },
});

class Copyright extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {/* Footer */}
                <footer className={classes.footer}>
                    <Container maxWidth="lg">
                        <Typography variant="h6" align="center" gutterBottom>
                            Footer
                    </Typography>
                        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                            Something here to give the footer a purpose!
                    </Typography>
                        <Typography variant="body2" color="textSecondary" align="center">
                            {'Copyright © '}
                            <Link color="inherit" href="https://material-ui.com/">
                                Your Website
                    </Link>{' '}
                            {new Date().getFullYear()}
                            {'. Built with '}
                            <Link color="inherit" href="https://material-ui.com/">
                                Material-UI.
                    </Link>
                        </Typography>
                    </Container>
                </footer>
                {/* End footer */}
            </React.Fragment>
        );
    }
}
Copyright.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Copyright);