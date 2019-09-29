import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SwipeableViews from 'react-swipeable-views';

import { CenteredTabs, TabPanel } from '../../../components';

import {GanttChart,AdminDashboard} from '../../'

const styles = theme => ({
    sub_layout_header: {

    },
    sub_header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    sub_header_section: {
        flexBasis: '33%',
    },
    content: {
        padding: '0px 55px 0px 55px',
    }
});
const tabs = [
    {
        name:"Timeline",
        component:GanttChart,
    },
    {
        name:"Analytics",
        component:AdminDashboard,
    }
];
class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
    }
    a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }
    handleChange = (event, newValue) => {
        this.setState({
            value: newValue,
        })
    }
    handleChangeIndex = index => {
        this.setState({
            value: index,
        })
    };
    render() {
        const { classes } = this.props;
        const { match } = this.props;
        console.log("ProjectView : ");
        console.log(match);
        return (
            <React.Fragment>
                <div className={classes.sub_layout_header}>
                    <div className={classes.sub_header}>
                        <div className={classes.sub_header_section}>

                        </div>
                        <div className={classes.sub_header_section}>
                            <CenteredTabs handleChange={this.handleChange} value={this.state.value} tabs={tabs} />
                        </div>
                        <div className={classes.sub_header_section}>

                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    <SwipeableViews
                        axis={'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        {
                            tabs.map((tab,key)=>(
                                <TabPanel key={key} value={this.state.value} index={key}>
                                    <tab.component/>
                                </TabPanel>  
                            ))
                        }
                    </SwipeableViews>
                </div>
            </React.Fragment>
        );
    }
}
ProjectView.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProjectView);