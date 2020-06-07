import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TreeItemCustom, StyledTreeItem } from '..'
//
import TreeView from '@material-ui/lab/TreeView';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const styles = theme => ({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
});
class TreeViewCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultExpanded: [],
            index: 1
        }
        this.getData = this.getData.bind(this);
        this.setExpanded = this.setExpanded.bind(this);
        this.getIndex = this.getIndex.bind(this);
    }
    getData() {
        return [{
            id: this.getIndex()
        }];
    }
    getIndex() {
        let index = this.state.index;
        index = index + 1;
        this.setState({
            index: index
        })
        return index;
    }
    setExpanded(id) {
        let defaultExpanded = this.state.defaultExpanded;
        if (defaultExpanded.includes(id)) {
            console.log("[WikiManagement] Expanded includes " + id);
            defaultExpanded.pop(id);
        } else {
            defaultExpanded.push(id);
        }
        this.setState({
            defaultExpanded: defaultExpanded
        })
        console.log("[WikiManagement] setExpanded " + JSON.stringify(this.state.defaultExpanded))
    }
    render() {
        const { classes } = this.props;
        let { defaultExpanded } = this.state;
        let data = {
            id: 0
        }
        return (
            <TreeView
                className={classes.root}
                defaultExpanded={defaultExpanded}
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                defaultEndIcon={<div style={{ width: 24 }} />}
            >
                <TreeItemCustom dataCurrent={data} getData={this.getData} setExpanded={this.setExpanded} getIndex={this.getIndex} />
            </TreeView >
        );
    }
}
TreeViewCustom.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TreeViewCustom);