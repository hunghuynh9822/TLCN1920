import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../assets/jss/styles/views/adminHumanManagementStyle";

import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { PaginationTable, CollapsibleSection } from "../../components"

import { getAdminEmployees } from '../../action/employee';

const CustomPaginationTable = withStyles(theme => ({
    root: {
        marginTop: '0px',
    }
}))(PaginationTable);

class AdminHumanManagement extends Component {
    constructor(props) {
        super(props);
        this.state={
            columns: [
                { id: 'no', label: 'No.', minWidth: 50, align: 'center' },
                { id: 'name', label: 'Name', minWidth: 200 },
                { id: 'position', label: 'Position', minWidth: 100 },
                { id: 'phone', label: 'Phone', minWidth: 100 },
                { id: 'address', label: 'Address', minWidth: 400 },
                { id: 'action', label: 'Action', minWidth: 150, align: 'center' },
            ],
            rowsActive: [],
            rowsWaiting:[],
        }
    }

    createData(no, name, position, phone, address) {
        const action = ['view', 'delete'];
        return { no, name, position, phone, address, action };
    }
    
    createDataWaiting(no, name, position, phone, address) {
        const action = ['confirm'];
        return { no, name, position, phone, address, action };
    }

    componentDidMount() {
        getAdminEmployees()
            .then(response => {
                // console.log(response.activeEmployees);
                // console.log(response.waitingEmployees);
                let activeEmployees = [];
                let waitingEmployees = [];
                response.activeEmployees.map((employee, index) => {
                    let name = employee.firstName + " " + employee.middleName + " " + employee.lastName;
                    let position = employee.position.name;
                    let phone = employee.phone;
                    let address = employee.address;
                    activeEmployees.push(this.createData(index + 1, name, position, phone, address));
                })
                response.waitingEmployees.map((employee, index) => {
                    let name = employee.firstName + " " + employee.middleName + " " + employee.lastName;
                    let position = employee.position.name;
                    let phone = employee.phone;
                    let address = employee.address;
                    waitingEmployees.push(this.createDataWaiting(index + 1, name, position, phone, address));
                })
                this.setState({
                    rowsActive: activeEmployees,
                    rowsWaiting: waitingEmployees,
                })
            }).catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
            });
    }
    render() {
        const { classes } = this.props;
        const {routes} = this.props;
        const { columns, rowsActive, rowsWaiting} = this.state;
        console.log(routes);
        return (
            <div className={classes.root}>
                <CollapsibleSection title="New Employees">
                    <CustomPaginationTable columns={columns} rows={rowsWaiting} style={{ marginTop: '0px' }} />
                </CollapsibleSection>
                <CollapsibleSection title="All Employees">
                    <CustomPaginationTable columns={columns} rows={rowsActive} style={{ marginTop: '0px' }} />
                </CollapsibleSection>
            </div>
        );
    }
}
AdminHumanManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AdminHumanManagement);