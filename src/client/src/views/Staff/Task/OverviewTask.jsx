import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { TaskContainer, Task } from '../../../components'
const styles = theme => ({

});
class OverviewTask extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        listUser: [],
    }
    componentDidMount() {
        var listU = [{ "id": 1, "proID": 15737973290221, "name": "Liem" },
        { "id": 2, "proID": 15737973290221, "name": "Hung" }];


        this.setState({ listUser: listU });


    }


    render() {
        const { classes } = this.props;

        return (
            <TaskContainer>
                {this.state.listUser.map((user, index) => <Task key={index} user={user} />)}
            </TaskContainer>
        );
    }
}
OverviewTask.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OverviewTask);