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
            index: 1,
            selected: null
        }
        //
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        //
        this.getData = this.getData.bind(this);
        this.setExpanded = this.setExpanded.bind(this);
        this.getIndex = this.getIndex.bind(this);
        //
        this.handleSelectItem = this.handleSelectItem.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    /**
 * Set the wrapper ref
 */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            console.log("[WikiManagement] Outside tree view");
            this.handleSelectItem(null);
        }
    }

    handleSelectItem(item) {
        console.log("[WikiManagement] Select item " + JSON.stringify(item));
        this.setState({
            selected: item
        })
    }

    getData() {
        return [{
            id: this.getIndex(),
            title: "Wiki Title"
        }];
    }
    getIndex() {
        let index = this.state.index;
        index = index + 1;
        this.setState({
            index: index
        })
        return index + "";
    }
    setExpanded(id) {
        let defaultExpanded = this.state.defaultExpanded;
        if (defaultExpanded.includes(id)) {
            defaultExpanded.pop(id);
        } else {
            defaultExpanded.push(id);
        }
        this.setState({
            defaultExpanded: defaultExpanded
        })
    }
    render() {
        const { classes } = this.props;
        let { defaultExpanded } = this.state;
        let data = {
            id: '0',
            title: "Wiki Title"
        }
        return (
            <div ref={this.setWrapperRef}>
                <TreeView
                    className={classes.root}
                    defaultExpanded={defaultExpanded}
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                >
                    <TreeItemCustom dataCurrent={data} getData={this.getData} setExpanded={this.setExpanded} getIndex={this.getIndex} handleSelectItem={this.handleSelectItem} />
                </TreeView >
            </div>
        );
    }
}
TreeViewCustom.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TreeViewCustom);