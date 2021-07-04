import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({

});
import DropDownCard from './DropDownCard.jsx'
const sampleData = new Array(7).fill("item name");
class ButtonDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleOpen(open) {
        this.setState({
            open: open
        })
    }

    handleClick(e) {
        if (this.wrapperRef && !this.wrapperRef.contains(e.target) && this.state.open) {
            this.handleOpen(false);
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div
                    className="dropdown"
                    ref={this.setWrapperRef}
                    style={{
                        position: "relative",
                        zIndex: 1000
                    }}
                >
                    <Button variant="outlined" size="small" color="primary" style={{
                        alignSelf: 'flex-start',
                        borderStyle: 'dashed',
                        fontSize: '0.6em',
                        marginBottom: '8px',
                        // opacity: '0.7',
                        color: `${this.props.colorWord}`,
                        backgroundColor: `${this.props.backgroundColor}`
                    }}
                        onClick={() => this.handleOpen(!this.state.open)}
                    >
                        {this.props.name}
                    </Button>
                </div>
                {this.state.open && <DropDownCard handleOpen={this.handleOpen} handleStateChange={this.props.handleStateChange} task={this.props.task} />}
            </React.Fragment>
        );
    }
}
ButtonDropdown.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    task: PropTypes.object.isRequired,
    handleStateChange: PropTypes.func.isRequired
};
export default withStyles(styles)(ButtonDropdown);