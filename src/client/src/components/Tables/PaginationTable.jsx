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
import Pagination from "./Pagination.jsx"

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
        overflowX: 'auto',
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
    // head: {
    //     backgroundColor: theme.palette.common.black,
    //     color: 'inherit',
    // },
    body: {
        color: 'inherit',
        fontSize: 14,
    },
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
    render() {
        const { classes } = this.props;
        const { columns, rows} = this.props;
        const { page, rowsPerPage } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        className={classes.stickyHeader}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                                // <TableRow key={row.name}>
                                //     <TableCell component="th" scope="row">
                                //         {row.name}
                                //     </TableCell>
                                //     <TableCell align="right">{row.calories}</TableCell>
                                //     <TableCell align="right">{row.fat}</TableCell>
                                // </TableRow>
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                            {/* {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )} */}
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
    rows: PropTypes.array.isRequired,
};
export default withStyles(styles)(PaginationTable);