import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { CollapsibleSection, Project, NewProject } from '../';

const styles = theme => ({

});

class OverviewProject extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}
OverviewProject.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OverviewProject);