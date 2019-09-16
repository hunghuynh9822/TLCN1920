import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../assets/jss/styles/views/employeeManagementStyle";

import {MaterialTable,PaginationTable} from "../../components"

class EmployeeManagement extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <PaginationTable/>
            </React.Fragment>
        );
    }
}
EmployeeManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EmployeeManagement);