import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../assets/jss/styles/views/employeeManagementStyle";

import { MaterialTable, PaginationTable, AddStaff, RequestAddStaff } from "../../components"

import { getEmployees } from '../../action/employee'

class EmployeeManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { id: 'no', label: 'No.', minWidth: 50, align: 'center' },
                { id: 'name', label: 'Name', minWidth: 200 },
                { id: 'position', label: 'Position', minWidth: 130 },
                { id: 'phone', label: 'Phone', minWidth: 100 },
                { id: 'address', label: 'Address', minWidth: 400 },
                { id: 'action', label: 'Action', minWidth: 150, align: 'center' },
            ],
            rows: []
        }
    }
    createData(no, name, position, phone, address) {
        // const action = "View | Confirm";
        const action = ['view', 'delete'];
        return { no, name, position, phone, address, action };
    }
    componentDidMount() {
        getEmployees()
            .then(response => {
                console.log(response.employees);
                let employees = [];
                response.employees.map((employee, index) => {
                    let name = employee.firstName + " " + employee.middleName + " " + employee.lastName;
                    let position = employee.position.name;
                    let phone = employee.phone;
                    let address = employee.address;
                    employees.push(this.createData(index + 1, name, position, phone, address));
                })
                console.log(employees);
                this.setState({
                    rows: employees,
                })
            }).catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
            });
    }
    render() {
        const { classes } = this.props;
        const { columns, rows } = this.state;
        return (
            <div className={classes.root}>
                <div>
                    {/* <AddStaff/> */}
                    <RequestAddStaff />
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