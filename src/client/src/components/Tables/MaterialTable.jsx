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
            selectRow: null,
        });
        this.selectRow = this.selectRow.bind(this);
    }

    selectRow(rowData, isEdit) {
        this.setState({
            selectedRow: rowData.tableData.id
        })
        this.props.handleSelectData(rowData, isEdit)
    }

    render() {
        const { classes } = this.props;
        return (
            <MTable
                title={this.props.title}
                columns={this.props.columns}
                data={this.props.data}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => {
                            this.selectRow(rowData, true)
                            console.log("[Table] Select row ", rowData)
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => {
                            confirm("You want to delete " + rowData.name)
                            this.props.onDelete(rowData.id)
                        }
                    }
                ]}
                onRowClick={((event, rowData) => {
                    this.selectRow(rowData, false)
                    console.log("[Table] Select row ", rowData)
                })}
                options={{
                    rowStyle: rowData => ({
                        backgroundColor: (this.state.selectRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                    })
                }}
            />
        );
    }
}
MaterialTable.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    handleSelectData: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(MaterialTable);
