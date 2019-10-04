import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { CollapsibleSection, Project, NewProject } from '../../../components';

const styles = theme => ({
    root:{
        padding: '0px 55px 0px 55px',
    }
});

class OverviewProject extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CollapsibleSection title="Recent Projects">
                    <Project />
                    <Project />
                    <Project />
                </CollapsibleSection>
                <CollapsibleSection title="My Project">
                    <Project />
                    <Project />
                    <Project />
                    <NewProject />
                </CollapsibleSection>
            </div>
        );
    }
}
OverviewProject.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OverviewProject);