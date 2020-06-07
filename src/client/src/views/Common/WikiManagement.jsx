import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//
import Grid from '@material-ui/core/Grid';
//
import { TreeViewCustom } from '../../components';
const styles = theme => ({

});
class WikiManagement extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={3} sm={3}><TreeViewCustom /></Grid>
                    <Grid item xs={9} sm={9}>Wiki content</Grid>
                </Grid>

            </React.Fragment>
        );
    }
}
WikiManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(WikiManagement);