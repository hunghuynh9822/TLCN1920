import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/styles/views/infomationStyle'
import {Infomate} from '../../components'
class Infomation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{paddingTop:'5%', backgroundColor:"#f2f2f2", height: 'calc(100vh - 120px)'}}>
                <Infomate/>
            </div>
        );
    }
}
Infomation.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Infomation);