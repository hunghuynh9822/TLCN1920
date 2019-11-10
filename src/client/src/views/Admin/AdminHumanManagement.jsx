import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../assets/jss/styles/views/adminHumanManagementStyle";

import { withAlert } from 'react-alert'

import Typography from '@material-ui/core/Typography';

import { PaginationTable, CollapsibleSection } from "../../components";
import { CustomDialog, ViewEmployee, SetupAccount, ConfirmDialog } from '../../components';

import { getAdminEmployees, updateState, getRoles } from '../../action/employee';

const CustomPaginationTable = withStyles(theme => ({
    root: {
        marginTop: '0px',
    }
}))(PaginationTable);

class AdminHumanManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { id: 'no', label: 'No.', minWidth: 50, align: 'center' },
                { id: 'name', label: 'Name', minWidth: 200 },
                { id: 'position', label: 'Position', minWidth: 100 },
                { id: 'phone', label: 'Phone', minWidth: 100 },
                { id: 'address', label: 'Address', minWidth: 400 },
                { id: 'action', label: 'Action', minWidth: 150, align: 'center' },
            ],
            rowsActive: [],
            rows  : [],
            steps: [],
            open: false,
            error: null,
            request: {
                method: '',
                curEmployee: null,
                roles: []
            },

            openConfirm: false,
            requestConfirm: {
                method: '',
                curEmployee: null,
            },

            roles: [],
            rolesMap: null,
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.getStepContent = this.getStepContent.bind(this);

        this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
        this.loadData = this.loadData.bind(this);

        this.callActionCofirm = this.callActionCofirm.bind(this);
        this.callActionView = this.callActionView.bind(this);
        this.callActionDelete = this.callActionDelete.bind(this);

        this.handleOpenConfirm = this.handleOpenConfirm.bind(this);
        this.handleCloseConfirm = this.handleCloseConfirm.bind(this);
        this.handleSubmitConfirm = this.handleSubmitConfirm.bind(this);
    }

    callActionCofirm(method, row) {
        this.setState({
            request: { ...this.state.request, method: method, curEmployee: row.data },
            steps: ['Information', 'Setup Account'],
        })
        this.handleOpen();
    }

    callActionView(method, row) {
        let roles = row.data.roles.map((value) => {
            return value.name;
        })
        this.setState({
            request: { ...this.state.request, method: method, curEmployee: row.data, roles: roles },
            steps: ['Information', 'Setup Account'],
        })
        this.handleOpen();
    }

    callActionDelete(method, row) {
        this.setState({
            requestConfirm: { ...this.state.requestConfirm, method: method, curEmployee: row.data },
        })
        this.handleOpenConfirm();
    }

    createData(no, name, position, phone, address, data) {
        const action = [{
            name: 'view',
            method: this.callActionView
        }, {
            name: 'delete',
            method: this.callActionDelete
        }];
        return { no, name, position, phone, address, action, data };
    }

    createDataWaiting(no, name, position, phone, address, data) {
        const action = [{
            name: 'confirm',
            method: this.callActionCofirm
        }];
        return { no, name, position, phone, address, action, data };
    }

    handleChangeMultiple(event) {
        this.setState(prevState => {
            let request = Object.assign({}, prevState.request);
            request.roles = event.target.value;
            return { request };
        })
    };

    loadData() {
        const { alert } = this.props;
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
                    activeEmployees.push(this.createData(index + 1, name, position, phone, address, employee));
                })
                response.waitingEmployees.map((employee, index) => {
                    let name = employee.firstName + " " + employee.middleName + " " + employee.lastName;
                    let position = employee.position.name;
                    let phone = employee.phone;
                    let address = employee.address;
                    waitingEmployees.push(this.createDataWaiting(index + 1, name, position, phone, address, employee));
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

    componentDidMount() {
        const { alert } = this.props;
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
                    activeEmployees.push(this.createData(index + 1, name, position, phone, address, employee));
                })
                response.waitingEmployees.map((employee, index) => {
                    let name = employee.firstName + " " + employee.middleName + " " + employee.lastName;
                    let position = employee.position.name;
                    let phone = employee.phone;
                    let address = employee.address;
                    waitingEmployees.push(this.createDataWaiting(index + 1, name, position, phone, address, employee));
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

        getRoles()
            .then(response => {
                let roles = {};
                response.roles.map((value) => {
                    roles[value.name] = value.id;
                })
                this.setState({
                    roles: response.roles,
                    rolesMap: roles,
                });
                console.log(this.state.rolesMap);
            })
            .catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
            });
    }

    handleClose() {
        this.setState({
            open: false,
            error: null,
            request: {
                ...this.state.request,
                roles: []
            }
        })
    }

    handleOpen() {
        this.setState({
            open: true
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const request = {
            id: this.state.request.curEmployee.id,
            status: 1,
            roles: this.state.request.roles.map((value) => {
                return this.state.rolesMap[value];
            }),
        }
        console.log("Request " + JSON.stringify(request));
        updateState(request)
            .then((response) => {
                console.log(response);
                this.loadData();
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: error,
                })
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
            });

        const { alert } = this.props;
        alert.success("Update successfully", { timeout: 1000, });
    }

    handleResponse() {
        const { error } = this.state;
        if (error) {
            return (
                <Typography variant="h5" gutterBottom>
                    Update employee failed
                </Typography>
            )
        } else {
            return (
                <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                        Update successfully
                    </Typography>
                </React.Fragment>
            )
        }
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return <ViewEmployee employee={this.state.request.curEmployee} />;
            case 1:
                return <SetupAccount request={this.state.request} handleChangeMultiple={this.handleChangeMultiple} roles={this.state.roles} />
            default:
                throw new Error('Unknown step');
        }
    }

    handleOpenConfirm() {
        this.setState({
            openConfirm: true
        })
    }

    handleCloseConfirm() {
        this.setState({
            openConfirm: false,
            error: null,
        })
    }

    handleSubmitConfirm(event) {
        const { alert } = this.props;
        event.preventDefault();
        const request = {
            id: this.state.requestConfirm.curEmployee.id,
            status: 2,
        }
        updateState(request)
            .then((response) => {
                console.log(response);
                this.loadData();
                alert.success("Update successfully", { timeout: 1000, });
                this.handleCloseConfirm();
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: error,
                })
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
                this.handleCloseConfirm();
            });

    }

    render() {
        const { classes } = this.props;
        const { routes } = this.props;
        const { columns, rowsActive, rowsWaiting } = this.state;
        const { open, steps, request } = this.state;
        const { openConfirm } = this.state;
        return (
            <div className={classes.root}>
                <CollapsibleSection title="New Employees">
                    <CustomPaginationTable columns={columns} rows={rowsWaiting} style={{ marginTop: '0px' }} />
                </CollapsibleSection>
                <CollapsibleSection title="All Employees">
                    <CustomPaginationTable columns={columns} rows={rowsActive} style={{ marginTop: '0px' }} />
                </CollapsibleSection>
                <CustomDialog
                    title='EMPLOYEE'
                    open={open}
                    steps={steps}
                    request={request}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleSubmit}
                    handleResponse={this.handleResponse}
                    getStepContent={this.getStepContent}
                />
                <ConfirmDialog
                    open={openConfirm}
                    title={'Delete employee ?'}
                    content={'Do you want to delete employee with ....'}
                    handleClose={this.handleCloseConfirm}
                    handleSubmit={this.handleSubmitConfirm}
                />
            </div>
        );
    }
}
AdminHumanManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(withAlert()(AdminHumanManagement));