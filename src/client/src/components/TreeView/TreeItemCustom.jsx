import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//
import { StyledTreeItem } from '..'
//
import Label from '@material-ui/icons/Label';
//
const styles = theme => ({

});
class TreeItemCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataChild: []
        }
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleLabelClick = this.handleLabelClick.bind(this);
    }
    handleIconClick() {
        console.log("[WikiManagement] Item tree click -> icon");
    }
    handleLabelClick() {
        console.log("[WikiManagement] Item tree click -> label " + JSON.stringify(this.state.dataChild));
        const { dataCurrent, getData, setExpanded } = this.props;
        let data = getData();
        console.log("[WikiManagement] Item tree click " + JSON.stringify(data))
        this.setState({
            dataChild: data
        })
        setExpanded(dataCurrent.id);
    }
    render() {
        const { classes } = this.props;
        const { dataCurrent, getData, setExpanded } = this.props;
        const { dataChild } = this.state;
        console.log("[WikiManagement] DataCurrent " + dataCurrent.id);
        return (
            <StyledTreeItem nodeId={dataCurrent.id} labelText="Categories" labelIcon={Label} onIconClick={this.handleIconClick} onLabelClick={this.handleLabelClick}>
                {dataChild.map((item, index) =>
                    <TreeItemCustom classes={classes} key={item.id} dataCurrent={item} getData={getData} setExpanded={setExpanded} ></TreeItemCustom>
                )}
            </StyledTreeItem>
        );
    }
}
TreeItemCustom.propTypes = {
    classes: PropTypes.object.isRequired,
    dataCurrent: PropTypes.object.isRequired,
    getData: PropTypes.func.isRequired,
    setExpanded: PropTypes.func
};
export default withStyles(styles)(TreeItemCustom);