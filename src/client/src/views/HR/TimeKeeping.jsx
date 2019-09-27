import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/styles/views/timeKeepingStyle';
import { PaginationTable } from "../../components"
const columns = [
    { id: 'no', label: 'No.', width: 15},
    { id: 'name', label: 'Name', width: 100 },
    { id: 'position', label: 'Position', width: 100 },
];

function createData(no, title) {
    const action = "View | Delete"
    return { no, title, action };
}

const rows = [
    createData('01', 'Thông báo nghỉ 2/9'),
    createData('02', 'Thông báo họp ngày 3/9'),
];
class TimeKeeping extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <PaginationTable columns={columns} rows={rows} />
            </div>
        );
    }
}
TimeKeeping.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TimeKeeping);