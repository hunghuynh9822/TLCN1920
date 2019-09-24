import React, { Component } from 'react';
import MTable from 'material-table';
class MaterialTable extends Component {
    constructor(props) {
        super(props);
        this.state = ({
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
    }
    render() {
        const { classes } = this.props;
        return (
            <MTable
                title="Editable Example"
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...this.state.data];
                                data.push(newData);
                                this.setState({ ...this.state, data });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...this.state.data];
                                data[data.indexOf(oldData)] = newData;
                                this.setState({ ...this.state, data });
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...this.state.data];
                                data.splice(data.indexOf(oldData), 1);
                                this.setState({ ...this.state, data });
                            }, 600);
                        }),
                }}
            />
        );
    }
}
export default MaterialTable;