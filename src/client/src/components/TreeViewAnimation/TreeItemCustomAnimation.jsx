import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//
import { StyledTreeItemAnimation } from '..'
//
import Label from '@material-ui/icons/Label';
//

const styles = theme => ({

});
class TreeItemCustomAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataChild: []
        }
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleLabelClick = this.handleLabelClick.bind(this);
        this.handleReloadData = this.handleReloadData.bind(this);
    }
    truncate(str, n, useWordBoundary) {
        if (str.length <= n) { return str; }
        const subString = str.substr(0, n - 1); // the original check
        return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(" "))
            : subString) + " ...";
    };
    handleIconClick() {
        console.log("[WikiManagement] Item tree click -> icon");
        const { dataCurrent, getData, setExpanded, handleSelectItem } = this.props;
        handleSelectItem(dataCurrent, this.handleReloadData);
    }
    handleReloadData() {
        const { dataCurrent, getData, setExpanded, handleSelectItem } = this.props;
        getData(dataCurrent.path + dataCurrent.id + "/")
            .then(response => {
                this.setState({
                    dataChild: response
                })
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong when reload data. Please try again!');
            });
    }
    handleLabelClick() {
        console.log("[WikiManagement] Item tree click -> label");
        const { dataCurrent, getData, setExpanded, handleSelectItem } = this.props;
        handleSelectItem(dataCurrent, this.handleReloadData);
    }
    componentWillReceiveProps() {
        const { dataCurrent, getData, setExpanded, handleSelectItem } = this.props;
        console.log("[WikiManagement] componentWillReceiveProps DataCurrent ", dataCurrent);
        getData(dataCurrent.path + dataCurrent.id + "/")
            .then(response => {
                this.setState({
                    dataChild: response
                })
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong on get child on componentDidMount. Please try again!');
            });
    }

    componentDidMount() {
        const { dataCurrent, getData, setExpanded, handleSelectItem } = this.props;
        console.log("[WikiManagement] componentDidMount DataCurrent ", dataCurrent);
        getData(dataCurrent.path + dataCurrent.id + "/")
            .then(response => {
                this.setState({
                    dataChild: response
                })
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong on get child on componentDidMount. Please try again!');
            });
    }
    render() {
        const { classes } = this.props;
        const { dataCurrent, getData, setExpanded, handleSelectItem } = this.props;
        const { dataChild } = this.state;
        return (
            <StyledTreeItemAnimation nodeId={dataCurrent.id + ""} label={this.truncate(dataCurrent.title, 25, true)} onIconClick={this.handleIconClick} onLabelClick={this.handleLabelClick}>
                {dataChild.map((item, index) =>
                    <TreeItemCustomAnimation classes={classes} key={item.id} dataCurrent={item} getData={getData} setExpanded={setExpanded} handleSelectItem={handleSelectItem}></TreeItemCustomAnimation>
                )}
            </StyledTreeItemAnimation>
        );
    }
}
TreeItemCustomAnimation.propTypes = {
    classes: PropTypes.object.isRequired,
    dataCurrent: PropTypes.object.isRequired,
    getData: PropTypes.func.isRequired,
    setExpanded: PropTypes.func,
    handleSelectItem: PropTypes.func
};
export default withStyles(styles)(TreeItemCustomAnimation);