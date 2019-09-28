import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../assets/jss/styles/views/adminHumanManagementStyle";

import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { PaginationTable } from "../../components"

const columns = [
    { id: 'no', label: 'No.', minWidth: 50, align: 'center' },
    { id: 'name', label: 'Name', minWidth: 200 },
    { id: 'position', label: 'Position', minWidth: 100 },
    { id: 'phone', label: 'Phone', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 400 },
    { id: 'action', label: 'Action', minWidth: 150, align: 'center' },
];

function createData(no, name, position, phone, address) {
    const action = ['view', 'delete'];
    return { no, name, position, phone, address, action };
}

function createDataNew(no, name, position, phone, address) {
    const action = ['confirm'];
    return { no, name, position, phone, address, action };
}

const rowsAll = [
    createData('01', 'Huỳnh Lê Hữu Hưng', "Nhân viên", "0961561682", "123, Đường A, P.B, Q.C, Tp HCM"),
    createData('02', 'Thái Thanh Liêm', "Nhân viên", "0961561682", "123, Đường A, P.B, Q.C, Tp HCM"),
];

const rowsNew = [
    createDataNew('01', 'Nguyễn Văn A', "Nhân viên", "0961561682", "123, Đường A, P.B, Q.C, Tp HCM"),
];

const CustomPaginationTable = withStyles(theme => ({
    root:{
        marginTop:'0px',
    }
}))(PaginationTable);

class AdminHumanManagement extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.area}>
                    <div className={classes.bar}>
                        <ExpandMore /> New Employees
                    </div>
                    <div className={classes.container}>
                        <CustomPaginationTable columns={columns} rows={rowsNew} style={{marginTop:'0px'}}/>
                    </div>
                </div>
                <div className={classes.area}>
                    <div className={classes.bar}>
                        <ExpandMore /> All Employees
                    </div>
                    <div className={classes.container}>
                        <CustomPaginationTable columns={columns} rows={rowsAll} style={{marginTop:'0px'}}/>
                    </div>
                </div>
            </div>
        );
    }
}
AdminHumanManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AdminHumanManagement);