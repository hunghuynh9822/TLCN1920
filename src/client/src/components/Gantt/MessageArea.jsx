import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({

});
class MessageArea extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const messages = this.props.messages.map(({ message }) => {
            return <li key={ Math.random() }>{message}</li>
        });
        return (
            <div className="message-area">
                <h3>Messages:</h3>
                <ul>
                    { messages }
                </ul>
            </div>
        );
    }
}
MessageArea.defaultProps = {
    messages: []
};
MessageArea.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MessageArea);