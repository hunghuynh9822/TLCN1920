import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/styles/views/timeKeepingStyle';
import { PaginationTable } from "../../components"
const columns = [
    { id: 'no', label: 'No.', minWidth: 15 },
    { id: 'name', label: 'Name', minWidth: 200 },
    { id: 'position', label: 'Position', minWidth: 150 },
    { id: 'mon', label: 'Mon', minWidth: 20, align: 'center' },
    { id: 'tus', label: 'Tus', minWidth: 20, align: 'center' },
    { id: 'wed', label: 'Wed', minWidth: 20, align: 'center' },
    { id: 'thu', label: 'Thu', minWidth: 20, align: 'center' },
    { id: 'fri', label: 'Fri', minWidth: 20, align: 'center' },
    { id: 'sat', label: 'Sat', minWidth: 20, align: 'center' },
    { id: 'sun', label: 'Sun', minWidth: 20, align: 'center' },
    { id: 'total', label: 'Total', minWidth: 20  , align:'center'},
    { id: 'action', label: 'Action', minWidth: 80  , align:'center'},
];

function createData(no, name, position, mon, tus, wed, thu, fri, sat, sun, total) {
    const action = ['confirm'];
    return { no, name, position, mon, tus, wed, thu, fri, sat, sun, total, action };
}

const rows = [
    createData('01', 'Huỳnh Lê Hữu Hưng', "Nhân viên", "A", "v", "v", "_", "_", "_", "_", "2.6"),
    createData('02', 'Thái Thanh Liêm', "Nhân viên", "v", "v", "v", "_", "_", "_", "_", "3"),
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