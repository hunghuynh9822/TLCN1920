import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { StyledTreeItem } from '..'
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
    }
    render() {
        const { classes } = this.props;
        return (
            <TreeView
                className={classes.root}
                defaultExpanded={['3']}
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                defaultEndIcon={<div style={{ width: 24 }} />}
            >
                <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={MailIcon} />
                <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={DeleteIcon} />
                <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={Label}>
                    <StyledTreeItem
                        nodeId="5"
                        labelText="Social"
                        labelIcon={SupervisorAccountIcon}
                        labelInfo="90"
                        color="#1a73e8"
                        bgColor="#e8f0fe"
                    />
                    <StyledTreeItem
                        nodeId="6"
                        labelText="Updates"
                        labelIcon={InfoIcon}
                        labelInfo="2,294"
                        color="#e3742f"
                        bgColor="#fcefe3"
                    />
                    <StyledTreeItem
                        nodeId="7"
                        labelText="Forums"
                        labelIcon={ForumIcon}
                        labelInfo="3,566"
                        color="#a250f5"
                        bgColor="#f3e8fd"
                    />
                    <StyledTreeItem
                        nodeId="8"
                        labelText="Promotions"
                        labelIcon={LocalOfferIcon}
                        labelInfo="733"
                        color="#3c8039"
                        bgColor="#e6f4ea"
                    />
                </StyledTreeItem>
                <StyledTreeItem nodeId="4" labelText="History" labelIcon={Label} />
            </TreeView>
        );
    }
}
TreeViewCustom.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TreeViewCustom);