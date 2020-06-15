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
        console.log("[WikiManagement] Item tree click -> label");
        const { dataCurrent, getData, setExpanded, handleSelectItem } = this.props;
        console.log("[WikiManagement] DataCurrent " + JSON.stringify(dataCurrent));
        getData(dataCurrent.path + dataCurrent.id + "/")
            .then(response => {
                this.setState({
                    dataChild: response
                })
                setExpanded(dataCurrent.id + "");
                handleSelectItem(dataCurrent);
            }).catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
            });
    }
    render() {
        const { classes } = this.props;
        const { dataCurrent, getData, setExpanded, handleSelectItem } = this.props;
        const { dataChild } = this.state;
        return (
            <StyledTreeItem nodeId={dataCurrent.id + ""} labelText={dataCurrent.title} labelIcon={Label} onIconClick={this.handleIconClick} onLabelClick={this.handleLabelClick}>
                {dataChild.map((item, index) =>
                    <TreeItemCustom classes={classes} key={item.id} dataCurrent={item} getData={getData} setExpanded={setExpanded} handleSelectItem={handleSelectItem}></TreeItemCustom>
                )}
            </StyledTreeItem>
        );
    }
}
TreeItemCustom.propTypes = {
    classes: PropTypes.object.isRequired,
    dataCurrent: PropTypes.object.isRequired,
    getData: PropTypes.func.isRequired,
    setExpanded: PropTypes.func,
    handleSelectItem: PropTypes.func
};
export default withStyles(styles)(TreeItemCustom);