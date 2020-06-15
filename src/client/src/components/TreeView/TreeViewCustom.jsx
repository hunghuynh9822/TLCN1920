import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TreeItemCustom, StyledTreeItem } from '..'
import { getWikiById, getWikiByPath, getWikiByProject } from '../../action/wiki'
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
            data: []
        }
        //
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        //
        this.getData = this.getData.bind(this);
        this.setExpanded = this.setExpanded.bind(this);
        //
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
            setTimeout(function () { //Start the timer
                if (!this.props.isCreate) {
                    console.log("[WikiManagement] Outside tree view");
                    this.props.handleSelectItem(null);
                } else {
                    console.log("[WikiManagement] Is creating...");
                }
            }.bind(this), 1000)
        }
    }

    getData(path) {
        return getWikiByPath(path);
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
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        getWikiByPath("/")
            .then(response => {
                this.setState({
                    data: response
                })
            }).catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
            });
    }

    render() {
        const { classes } = this.props;
        let { defaultExpanded, data } = this.state;
        const { handleSelectItem } = this.props;
        const { root, ...otherClasses } = classes;
        return (
            <div ref={this.setWrapperRef}>
                <TreeView
                    className={classes.root}
                    defaultExpanded={defaultExpanded}
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                >
                    {data.map((item, index) =>
                        <TreeItemCustom classes={otherClasses} key={item.id} dataCurrent={item} getData={this.getData} setExpanded={this.setExpanded} handleSelectItem={handleSelectItem}></TreeItemCustom>
                    )}
                </TreeView >
            </div>
        );
    }
}
TreeViewCustom.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSelectItem: PropTypes.func.isRequired,
    isCreate: PropTypes.bool
};
export default withStyles(styles)(TreeViewCustom);