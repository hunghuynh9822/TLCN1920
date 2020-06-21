import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddStafftoProject from '../AddStafftoProject/AddStafftoProject';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Moment from 'moment';
import axios from 'axios';

import TuneIcon from '@material-ui/icons/Tune';
const styles = theme => ({
    card: {
        width: 275,
        height: 200,
        margin: theme.spacing(2),
        position: 'relative',
    },
    font: {
        color: '#8d919a',
        fontSize: '0.7em',
    },
    title: {
        margin: '12px 0px 0px 15px',
        fontSize: '0.8em',
        fontWeight: '400',
        color: '#464c59',
        '&:hover': {
            background: '#e6e6e6',
        },
        cursor: 'pointer',
    },
    customTooltip: {
        fontSize: '0.8em',
    },
});
const CustomProcessBar = withStyles({
    root: {
        height: 8,
        borderRadius: 20,
        backgroundColor: '#bfbfbf',
    },
    bar: {
        backgroundColor: '#30B1BD',
    }
})(LinearProgress)
const colorWord = "#ffffff";
const mapColor = {
    "NEW": "#0ac400",
    "DEVELOPING": "#e69900",
    "FINISH": "#0026ff"
}
class Project extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSetting = this.handleSetting.bind(this);
    }

    handleClick() {
        const { projectItem, handleToProject } = this.props;
        handleToProject(projectItem);
    }

    handleSetting() {
        console.log("Click setting");
    }

    truncate(str, n, useWordBoundary) {
        if (str.length <= n) { return str; }
        const subString = str.substr(0, n - 1); // the original check
        return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(" "))
            : subString) + " ...";
    };

    renderStateProject(process) {
        let state = "";
        if (process == 0) {
            state = "NEW";
        } else if (process == 100) {
            state = "FINISH"
        } else {
            state = "DEVELOPING"
        }
        let color = mapColor[state];
        return (
            <Button disabled variant="outlined" size="small" color="primary" style={{
                alignSelf: 'flex-start',
                borderStyle: 'dashed',
                fontSize: '0.6em',
                marginBottom: '8px',
                opacity: '0.7',
                backgroundColor: `${color}`,
                color: `${colorWord}`,
            }}>
                {state}
            </Button>
        )

    }

    render() {
        const { classes } = this.props;
        const project = this.props.projectItem.project;
        const moreInfo = this.props.projectItem.more;
        console.log("[Project] moreInfo " + JSON.stringify(moreInfo));
        return (
            <Card className={classes.card} >
                <CardHeader
                    action={
                        <IconButton aria-label="settings" onClick={this.handleSetting} style={{ margin: '10px' }}>
                            <TuneIcon />
                        </IconButton>
                    }
                    title={
                        <Tooltip title={project.title} placement="top" arrow classes={{ tooltip: classes.customTooltip }}>
                            <div className={classes.title} onClick={this.handleClick} >
                                {this.truncate(project.title, 25, true)}
                            </div>
                        </Tooltip>
                    }
                    subheader={
                        <div style={{
                            margin: '3px 0px 0px 15px',
                            fontSize: '0.7em',
                            fontWeight: '400',
                        }}>
                            {Moment(project.createdAt).format('YYYY-MM-DD')}
                        </div>
                    }
                    style={{ padding: '0px' }} />
                <CardContent style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: '0px',
                    padding: '0px 10px 10px 10px',
                    display: 'flex', /* or inline-flex */
                    flexDirection: 'column',
                }}>
                    {this.renderStateProject(moreInfo.process)}
                    <div style={{ marginBottom: '7px' }}>
                        <span className={classes.font} style={{ float: 'left' }}>
                            {moreInfo.process}% Completed
                        </span>
                        <span className={classes.font} style={{ float: 'right' }}>
                            {moreInfo.finish}/{moreInfo.total} Tasks
                        </span>
                    </div>
                    <CustomProcessBar variant="determinate" value={moreInfo.process} />
                </CardContent>
            </Card>
        );
    }
}
Project.propTypes = {
    classes: PropTypes.object.isRequired,
    projectItem: PropTypes.object.isRequired,
    handleToProject: PropTypes.func.isRequired,
};
export default withStyles(styles)(Project);