import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from 'react-avatar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    member_tag: {
        display: 'inline-flex',
        background: '#e6e8ec',
        borderRadius: '20px',
        marginBottom: '10px',
    },
    tag_name: {
        lineHeight: '30px',
        padding: '0px 0px 0px 10px',
    },
    icon_close: {
        minWidth: '30px',
        padding: '0px',
        borderRadius: '20px',
        "&:hover": {
            backgroundColor: "#e6e8ec",
            boxShadow: "none"
        }
    },
});
class TagMember extends Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }
    getName(employee) {
        return employee.lastName + " " + employee.firstName;
    }
    handleRemove() {
        const { member } = this.props;
        console.log("Remove member : " + member);
    }
    render() {
        const { classes } = this.props;
        const { member } = this.props;
        return (
            <div className={classes.member_tag}>
                {member.imageUrl ? (
                    <Avatar src={member.imageUrl} round="20px" size="30" />
                ) : (
                        <Avatar name={this.getName(member)} round="20px" size="30" />
                    )
                }
                <div className={classes.tag_name}>{this.getName(member)}</div>
                <Button onClick={this.removeMember} size="medium" color="primary" className={classes.icon_close}><CloseIcon fontSize="small" /></Button>
            </div>
        );
    }
}
TagMember.propTypes = {
    classes: PropTypes.object.isRequired,
    member: PropTypes.object.isRequired,
};
export default withStyles(styles)(TagMember);