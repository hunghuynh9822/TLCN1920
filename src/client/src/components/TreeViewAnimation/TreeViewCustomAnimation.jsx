import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TreeItemCustomAnimation } from '..'
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

import SvgIcon from '@material-ui/core/SvgIcon';

function MinusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props) {
    return (
        <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

const styles = theme => ({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
});
class TreeViewCustomAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultExpanded: [],
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
                    this.props.handleSelectItem(null, undefined);
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
    }

    render() {
        const { classes } = this.props;
        let { defaultExpanded } = this.state;
        let { data } = this.props;
        const { handleSelectItem } = this.props;
        const { root, ...otherClasses } = classes;
        return (
            <div ref={this.setWrapperRef}>
                <TreeView
                    className={classes.root}
                    defaultExpanded={defaultExpanded}
                    defaultCollapseIcon={<MinusSquare />}
                    defaultExpandIcon={<PlusSquare />}
                    defaultEndIcon={<CloseSquare />}
                >
                    {data.map((item, index) =>
                        <TreeItemCustomAnimation classes={otherClasses} key={item.id} dataCurrent={item} getData={this.getData} setExpanded={this.setExpanded} handleSelectItem={handleSelectItem}></TreeItemCustomAnimation>
                    )}
                </TreeView >
            </div>
        );
    }
}
TreeViewCustomAnimation.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSelectItem: PropTypes.func.isRequired,
    isCreate: PropTypes.bool,
    data: PropTypes.array.isRequired
};
export default withStyles(styles)(TreeViewCustomAnimation);