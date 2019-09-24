import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../assets/jss/styles/views/employeeManagementStyle";

import { MaterialTable, PaginationTable } from "../../components"

const columns = [
    { id: 'no', label: 'No.', minWidth: 50 },
    { id: 'title', label: 'Title', minWidth: 300 },
    { id: 'action', label: 'Action', minWidth: 100 },
];

function createData(no, title) {
    const action = "View | Delete"
    return { no, title, action };
}

const rows = [
    createData('01', 'Thông báo nghỉ 2/9'),
    createData('02', 'Thông báo họp ngày 3/9'),
];
class Notification extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <PaginationTable columns={columns} rows={rows} />
            </React.Fragment>
        );
    }
}
Notification.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Notification);