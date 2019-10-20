import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Tune from '@material-ui/icons/Tune';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddStafftoProject from '../AddStafftoProject/AddStafftoProject';
import Moment from 'moment';
const styles = theme => ({
    card: {
        width: 245,
        height: 200,
        margin: '0px 10px',
        position: 'relative',
    },
    font: {
        color: '#8d919a',
        fontSize: '0.7em',
    }
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
class Project extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <div style={{ margin: '20px' }}>
                            {/* <Tune /> */}
                            <AddStafftoProject admin={this.props.value.employeeCreate}/>
                        </div>

                    }
                    title={
                        <div style={{
                            margin: '12px 0px 0px 15px',
                            fontSize: '1em',
                            fontWeight: '400',
                            color: '#464c59',
                        }}>
                            {this.props.value.title}
                        </div>
                    }
                    subheader={
                        <div style={{
                            margin: '3px 0px 0px 15px',
                            fontSize: '0.7em',
                            fontWeight: '400',
                        }}>
                            {Moment(this.props.value.createTime).format('YYYY-MM-DD')}
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
                    <Button disabled variant="outlined" size="small" color="primary" style={{
                        alignSelf: 'flex-start',
                        borderStyle: 'dashed',
                        fontSize: '0.6em',
                        marginBottom: '8px',
                        opacity: '0.7',
                        color: '#8d919a',
                    }}>
                        No status
                    </Button>
                    <div style={{marginBottom:'7px'}}>
                        <span className={classes.font} style={{ float: 'left' }}>
                            50% Completed
                        </span>
                        <span className={classes.font} style={{ float: 'right' }}>
                            1/2 Tasks
                        </span>
                    </div>
                    <CustomProcessBar variant="determinate" value={50} />
                </CardContent>
            </Card>
        );
    }
}
Project.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Project);