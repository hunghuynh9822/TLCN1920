import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MTable from 'material-table';

const styles = theme => ({

});

class MaterialTable extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            selectedRow: null,
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Surname', field: 'surname' },
                { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                {
                    title: 'Birth Place',
                    field: 'birthCity',
                    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                },
            ],
            data: [
                { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                {
                    name: 'Zerya Betül',
                    surname: 'Baran',
                    birthYear: 2017,
                    birthCity: 34,
                },
            ],
        });
        this.selecteRow = this.selecteRow.bind(this);
    }

    selecteRow(selectedRow) {
        this.setState({
            selectedRow: selectedRow
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <MTable
                title="Editable Example"
                columns={this.state.columns}
                data={this.state.data}
                actions={[
                    {
                        icon: 'save',
                        tooltip: 'Save User',
                        onClick: (event, rowData) => alert("You saved " + rowData.name)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => confirm("You want to delete " + rowData.name)
                    }
                ]}
                onRowClick={((event, rowData) => {
                    alert("You saved " + rowData.name)
                    this.selecteRow(rowData.tableData.id)
                })}
                options={{
                    rowStyle: rowData => ({
                        backgroundColor: (this.state.selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                    })
                }}
            />
        );
    }
}
MaterialTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialTable);
