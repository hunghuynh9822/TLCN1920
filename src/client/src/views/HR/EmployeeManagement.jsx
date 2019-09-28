import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../assets/jss/styles/views/employeeManagementStyle";

import { MaterialTable, PaginationTable , AddStaff} from "../../components"

const columns = [
    { id: 'no', label: 'No.', minWidth: 50 ,align:'center'},
    { id: 'name', label: 'Name', minWidth: 200 },
    { id: 'position', label: 'Position', minWidth: 130 },
    { id: 'phone', label: 'Phone', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 400 },
    { id: 'action', label: 'Action', minWidth: 150 ,align: 'center'},
];

function createData(no, name, position, phone, address) {
    // const action = "View | Confirm";
    const action = ['view','delete'];
    return { no, name, position, phone, address, action };
}

const rows = [
    createData('01', 'Huỳnh Lê Hữu Hưng', "Nhân viên", "0961561682", "123, Đường A, P.B, Q.C, Tp HCM"),
    createData('02', 'Thái Thanh Liêm', "Nhân viên", "0961561682", "123, Đường A, P.B, Q.C, Tp HCM"),
];

class EmployeeManagement extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        console.log(window.location.href);
        return (
            <div className={classes.root}>
                <div>
                    <AddStaff/>
                </div>
                <PaginationTable columns={columns} rows={rows} />
            </div>
        );
    }
}
EmployeeManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EmployeeManagement);