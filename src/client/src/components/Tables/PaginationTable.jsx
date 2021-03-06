import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from "./Pagination.jsx";
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        maxHeight: 407,
        overflowX: 'hidden',
    },
    stickyHeader: {
        backgroundColor: '#978cfc',
        color: 'white',
        position: "sticky",
        top: 0,
        fontSize: 15,
    }
});


const StyledTableCell = withStyles(theme => ({
    root: {
        padding: '14px',
    }

}))(TableCell);


const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'blue',
            color: 'white'
        },
    },
}))(TableRow);

class PaginationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
        }
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }
    handleChangePage(event, newPage) {
        this.setState({
            page: newPage,
        });
    }

    handleChangeRowsPerPage(event) {
        this.setState({
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
        });
    }
    showActions(actions, row) {
        return actions.map((action) => {
            switch (action.name) {
                case 'view':
                    return this.showBtnView(action.method, row);
                case 'confirm':
                    return this.showBtnConfirm(action.method, row);
                case 'delete':
                    return this.showBtnDelete(action.method, row);
            }
        })
    }
    showBtnView(method, row) {
        return (
            <Button
                key='view'
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                    method('view', row);
                }}
                style={{
                    width: '60px',
                    margin: '0px 3px',
                }}
            >
                View
            </Button>
        )
    }
    showBtnConfirm(method, row) {
        return (
            <Button
                key='confirm'
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {
                    method('confirm', row);
                }}
                style={{
                    width: '80px',
                    margin: '0px 3px',
                    backgroundColor: '#9ae5e5',
                    color: 'white',
                }}
            >
                Confirm
            </Button>
        )
    }
    showBtnDelete(method, row) {
        return (
            <Button
                key='delete'
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {
                    method('delete', row);
                }}
                style={{
                    width: '80px',
                    margin: '0px 3px',
                    backgroundColor: '#DC3545',
                    color: 'white',
                }}
            >
                Delete
            </Button>
        )
    }
    render() {
        const { classes } = this.props;
        const { columns, rows } = this.props;
        const { page, rowsPerPage } = this.state;
        // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <StyledTableCell
                                        key={column.id}
                                        align='center'
                                        style={{ minWidth: column.minWidth, width: column.width }}
                                        className={classes.stickyHeader}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        // console.log(column.id + " : " + value);
                                        if (column.id === 'action') {
                                            return (
                                                <StyledTableCell key={column.id} align={column.align} style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        {this.showActions(value, row)}
                                                    </div>

                                                </StyledTableCell>
                                            );
                                        }
                                        return (
                                            <StyledTableCell key={column.id} align={column.align} style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </StyledTableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={Pagination}
                />
            </Paper>
        );
    }
}
PaginationTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array,
};
export default withStyles(styles)(PaginationTable);