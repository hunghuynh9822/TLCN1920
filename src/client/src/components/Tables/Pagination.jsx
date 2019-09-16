import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5),
    },
})
class Pagination extends Component {
    constructor(props) {
        super(props);
        this.handleFirstPageButtonClick = this.handleFirstPageButtonClick.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
        this.handleLastPageButtonClick = this.handleLastPageButtonClick.bind(this);
    }
    handleFirstPageButtonClick(event) {
        this.props.onChangePage(event, 0);
    }

    handleBackButtonClick(event) {
        this.props.onChangePage(event, this.props.page - 1);
    }

    handleNextButtonClick(event) {
        this.props.onChangePage(event, this.props.page + 1);
    }

    handleLastPageButtonClick(event) {
        this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
    }
    render() {
        const { classes } = this.props;
        const { count, page, rowsPerPage } = this.props;
        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    <FirstPageIcon />
                </IconButton>
                <IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    <LastPageIcon />
                </IconButton>
            </div>
        );
    }
}
Pagination.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
export default withStyles(styles)(Pagination);