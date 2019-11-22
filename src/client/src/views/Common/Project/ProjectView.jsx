import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SwipeableViews from 'react-swipeable-views';

import { CenteredTabs, TabPanel } from '../../../components';

import { ProjectDetails, ProjectTasks, GanttChart, ProjectAnalytics } from '../..'

import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const styles = theme => ({
    sub_layout_header: {

    },
    sub_header: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '45px',
        lineHeight: '45px',
        backgroundColor: 'white',
    },
    sub_header_section: {
        flexBasis: '33%',
    },
    tab_header: {
        marginBottom: '5px',
    },
    content: {
        padding: '0px 55px 0px 55px',
    },
    margin: {
        margin: theme.spacing(1),
    },
});

class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
        this.handleBack = this.handleBack.bind(this);
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
    handleBack() {
        const { match } = this.props;
        let path = match.path;
        let back = path.substring(0, path.lastIndexOf('/'));
        console.log("back :" + back)
        this.props.history.push(back);
    }
    render() {
        const { classes } = this.props;
        const tabs = [
            {
                name: "Overview",
                component: ProjectDetails,
            },
            {
                name: "Tasks",
                component: ProjectTasks,
            },
            {
                name: "Timeline",
                component: GanttChart,
            },
            {
                name: "Analytics",
                component: ProjectAnalytics,
            }
        ];
        const { match } = this.props;
        const projectId = match.params.projectId
        console.log("ProjectView : ");
        console.log(match);
        return (
            <React.Fragment>
                <div className={classes.sub_layout_header}>
                    <div className={classes.sub_header}>
                        <div className={classes.sub_header_section}>
                            <Button onClick={this.handleBack} size="medium" color="primary" className={classes.margin}>
                                <ArrowBackIosIcon className={classes.backIcon} />
                                Back
                            </Button>
                        </div>
                        <div className={classes.sub_header_section}>
                            aaaaaaa
                        </div>
                        <div className={classes.sub_header_section}>
                            Search
                        </div>
                    </div>
                </div>
                <div className={classes.sub_layout_header}>
                    <div className={classes.tab_header}>
                        <CenteredTabs handleChange={this.handleChange} value={this.state.value} tabs={tabs} />
                    </div>
                </div>
                <div className={classes.content}>
                    <SwipeableViews
                        axis={'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        {
                            tabs.map((tab, key) => (
                                <TabPanel key={key} value={this.state.value} index={key}>
                                    <tab.component projectId={projectId} />
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