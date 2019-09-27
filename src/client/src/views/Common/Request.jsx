import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../assets/jss/styles/views/requestStyle";

import { MaterialTable, PaginationTable,AddRequest } from "../../components"

const columns = [
    { id: 'no', label: 'No.', minWidth: 50 },
    { id: 'name', label: 'Name', minWidth: 200 },
    { id: 'position', label: 'Position', minWidth: 100 },
    { id: 'timestart', label: 'Time Start', minWidth: 100 },
    { id: 'timeend', label: 'Time End', minWidth: 100 },
    { id: 'reason', label: 'Reason', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 },
];

function createData(no, name, position, timestart, timeend, reason) {
    const action = "View | Confirm"
    return { no, name, position, timestart, timeend, reason, action };
}

const rows = [
    createData('01', 'Huỳnh Lê Hữu Hưng', "Nhân viên", "05/09/2019", "06/09/2019", "Việc gia đình"),
    createData('02', 'Thái Thanh Liêm', "Nhân viên", "08/09/2019", "09/09/2019", "Việc gia đình"),
];

class Request extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div>
                    <AddRequest/>
                </div>
                <PaginationTable columns={columns} rows={rows} />
            </div>
        );
    }
}
Request.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Request);