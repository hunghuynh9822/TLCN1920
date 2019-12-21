import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import { NewTask } from '../../../components';
import { AssignTasks, CompleteTasks } from '../../';

import SwipeableViews from 'react-swipeable-views';
import { CenteredTabs, TabPanel } from '../../../components';
const styles = theme => ({
    root: {

    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '35px',
        lineHeight: '35px',
        backgroundColor: 'white',
    },
    header_section: {
        flexBasis: '33%',
    },
    content: {

    },
    tabpanel: {
        overflow: 'hidden',
    }
});
const CustomSwipeableViews = withStyles(theme => ({
    root: {
        minHeight: '100%',
        overflow: 'hidden',
    }
}))(SwipeableViews);
class ProjectTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
        this.handleChangeTabs = this.handleChangeTabs.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
    }

    handleChangeTabs = (event, newValue) => {
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
        const { projectItem } = this.props;
        const tabs = [
            {
                name: "Complete Task",
                component: CompleteTasks,
            },
            {
                name: "Assign Task",
                component: AssignTasks,
            }
        ]
        return (
            <React.Fragment>
                {/* Hello Project Task : This will show in 2 mode
                - Table
                - Card task employee*/}
                <div className={classes.root}>
                    <div className={classes.header}>
                        <div className={classes.header_section}>
                            <NewTask />
                        </div>
                        <div className={classes.header_section}>
                            <CenteredTabs handleChange={this.handleChangeTabs} value={this.state.value} tabs={tabs} />
                        </div>
                        <div className={classes.header_section}>
                            Change mode
                        </div>
                    </div>
                    <div className={classes.content}>
                        <CustomSwipeableViews
                            axis={'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            {
                                tabs.map((tab, key) => (
                                    <TabPanel key={key} value={this.state.value} index={key} className={classes.tabpanel}>
                                        <tab.component />
                                    </TabPanel>
                                ))
                            }
                        </CustomSwipeableViews>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
ProjectTasks.propTypes = {
    classes: PropTypes.object.isRequired,
    projectItem: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
        loginRole: state.auth.loginRole,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(ProjectTasks)));