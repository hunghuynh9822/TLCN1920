import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DropdownTreeSelect from "react-dropdown-tree-select";
import data from "./data_demo.json";
const styles = theme => ({

});
class DropdownTree extends Component {
    constructor(props) {
        super(props);
    }
    onAction = (node, action) => {
        console.log('onAction::', action, node)
    }
    onNodeToggle = currentNode => {
        console.log('onNodeToggle::', currentNode)
    }
    onChange = (currentNode, selectedNodes) => {
        console.log("path::", currentNode.path);
    };
    assignObjectPaths = (obj, stack) => {
        Object.keys(obj).forEach(k => {
            const node = obj[k];
            if (typeof node === "object") {
                node.path = stack ? `${stack}.${k}` : k;
                assignObjectPaths(node, node.path);
            }
        });
    };
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <DropdownTreeSelect data={data} onChange={this.onChange} onAction={this.onAction} onNodeToggle={this.onNodeToggle} className="mdl-demo" mode="radioSelect" />
            </React.Fragment>
        );
    }
}
DropdownTree.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DropdownTree);