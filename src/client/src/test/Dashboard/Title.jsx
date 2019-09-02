import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
class Title extends Component {
    render() {
        return (
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {this.props.children}
            </Typography>
        );
    }
}
export default Title;