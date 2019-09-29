import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({

})
class CenteredTabs extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Tabs
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                </Tabs>
            </React.Fragment>
        );
    }
}
CenteredTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.any.isRequired,
};
export default withStyles(styles)(CenteredTabs);