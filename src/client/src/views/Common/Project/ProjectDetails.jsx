import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAlert } from 'react-alert';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Avatar from 'react-avatar';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { TagMember } from '../../../components';

import { invite, remove } from '../../../action/project'

const styles = theme => ({
    root: {
        width: '100%',
        minHeight: '100%',
        padding: '10px',
        margin: '0px'
    },
    details: {
        width: '100%',
        height: '100%',
        fontSize: '14px',
        color: '#696f7a',
    },
    member: {
        width: '100%',
        minHeight: 150,
    },
    paraph: {
        padding: '10px',
    },
    divider: {
        display: 'block',
        height: '1px',
        width: '100%',
        backgroundColor: '#e6e8ec',
    },
    title: {
        fontSize: '15px',
        padding: '20px',
    },
    title_name: {
        fontSize: '18px',
    },
    title_details: {
        color: '#b0b4bb',
        fontSize: '13px',
    },
    highlight: {
        color: '#8d919a',
        fontWeight: '600',
    },
    description: {
        padding: '10px',

    },
    description_details: {

    },
    members: {
        padding: '10px',
    },
    icon_add: {
        background: '#e6e8ec',
        color: '#696f7a',
        borderRadius: '5px',
        minWidth: '30px',
        minHeight: '30px',
        padding: '0px',
        margin: '0px 10px',
    },

});
class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAdd: false,
            roleAdd: '',
            projectOwner: null,
            projectAdmin: [],
            projectMembers: [],
        }
        this.removeMember = this.removeMember.bind(this);
        this.handleOpenAdd = this.handleOpenAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
    }

    filterRole(projectMembers, role) {
        return projectMembers.filter((member) => {
            if (member.role === role) {
                return true;
            }
        })
    }

    getName(employee) {
        return employee.lastName + " " + employee.firstName;
    }

    removeMember(member) {
        const { alert } = this.props;
        const { projectItem, freeEmployees, updateFreeEmployee } = this.props;
        let projectId = projectItem.project.id;
        let role = member.role;
        let removeRequest = {
            employeeId: member.id,
            projectId: projectId,
            role: role
        }
        remove(removeRequest)
            .then(response => {
                console.log("Remove response : " + JSON.stringify(response));
                if (role === 'ADMIN') {
                    this.setState(prevState => {
                        let projectAdmin = [...prevState.projectAdmin];
                        projectAdmin = projectAdmin.filter(oldMember => {
                            return oldMember.id !== member.id;
                        })
                        return { projectAdmin };
                    });
                    let newMember = { ...member, role: '' };
                    freeEmployees.push(newMember);
                    updateFreeEmployee(freeEmployees);
                } else if (role === 'MEMBER') {
                    this.setState(prevState => {
                        let projectMembers = [...prevState.projectMembers];
                        projectMembers = projectMembers.filter(oldMember => {
                            return oldMember.id !== member.id;
                        })
                        return { projectMembers };
                    });
                    let newMember = { ...member, role: '' };
                    freeEmployees.push(newMember)
                    updateFreeEmployee(freeEmployees);
                }
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong. Please try again!');
            });
    }

    handleOpenAdd(role) {
        this.setState({
            openAdd: true,
            roleAdd: role,
        })
    }

    handleCloseAdd() {
        this.setState({
            openAdd: false,
            roleAdd: '',
        })
    }

    handleListItemClick(member, role) {
        const { alert } = this.props;
        const { updateFreeEmployee, freeEmployees, projectItem } = this.props;
        let projectId = projectItem.project.id;
        if (role === 'ADMIN') {
            let inviteRequest = {
                employeeId: member.id,
                projectId: projectId,
                role: 1
            }
            invite(inviteRequest)
                .then(response => {
                    console.log("Invite response : " + JSON.stringify(response));
                    this.setState(prevState => {
                        let projectAdmin = [...prevState.projectAdmin];
                        let openAdd = false;
                        let roleAdd = '';
                        projectAdmin.push(member);
                        return { projectAdmin, openAdd, roleAdd };
                    });
                    updateFreeEmployee(freeEmployees.filter(free => {
                        return free.id !== member.id;
                    }));
                }).catch(error => {
                    console.log(error);
                    alert.error('Oops! Something went wrong. Please try again!');
                });
        } else if (role === 'MEMBER') {
            let inviteRequest = {
                employeeId: member.id,
                projectId: projectId,
                role: 2
            }
            invite(inviteRequest)
                .then(response => {
                    this.setState(prevState => {
                        let projectMembers = [...prevState.projectMembers];
                        let openAdd = false;
                        let roleAdd = '';
                        projectMembers.push(member);
                        return { projectMembers, openAdd, roleAdd };
                    })
                    updateFreeEmployee(freeEmployees.filter(free => {
                        return free.id !== member.id;
                    }));
                }).catch(error => {
                    console.log(error);
                    alert.error('Oops! Something went wrong. Please try again!');
                });
        }
    }

    componentWillMount() {
        const { projectItem } = this.props;
        // console.log("Project details : " + JSON.stringify(projectItem));
        this.setState({
            projectOwner: this.filterRole(projectItem.members, 'OWNER')[0],
            projectAdmin: this.filterRole(projectItem.members, 'ADMIN'),
            projectMembers: this.filterRole(projectItem.members, 'MEMBER'),
        })
    }


    render() {
        const { classes } = this.props;
        const { projectItem, freeEmployees } = this.props;
        // console.log("Project free employee : " + JSON.stringify(projectItem));
        const { projectOwner, projectAdmin, projectMembers } = this.state;
        let project = projectItem.project;

        return (
            <React.Fragment>
                <Grid container className={classes.root} spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Paper className={classes.details} >
                            <div className={classes.title}>
                                <div className={classes.title_name}>{project.title}</div>
                                <div className={classes.title_details}>
                                    <span>Created by </span>
                                    <span className={classes.highlight}>{this.getName(projectOwner)}</span>
                                </div>
                            </div>
                            <div className={classes.divider} />
                            <div className={classes.description}>
                                <div>Description</div>
                                <div className={classes.description_details}>
                                    <span>{project.description}</span>
                                </div>
                            </div>
                            <div className={classes.divider} />
                            <Grid item container className={classes.paraph}>
                                <Grid item xs={6}>Hello Project Details</Grid>
                                <Grid item xs={6}>Hello Project Details</Grid>
                            </Grid>
                            <div className={classes.divider} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={5} >
                        <Grid
                            item
                            container
                            direction="column"
                            spacing={3}
                        >
                            <Grid item xs={12} >
                                <Paper className={classes.member} >
                                    <div className={classes.title}>
                                        <div>Member</div>
                                    </div>
                                    <div className={classes.divider} />
                                    <Grid item container className={classes.paraph}>
                                        <Grid item xs={2}>Admin</Grid>
                                        <Grid item xs={10}>
                                            <div>
                                                <Button onClick={() => this.handleOpenAdd('ADMIN')} size="medium" color="primary" className={classes.icon_add}><AddIcon /></Button>
                                                {projectAdmin.map((member, index) => (
                                                    <TagMember key={index} member={member} removeMember={this.removeMember} />
                                                ))}
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item container className={classes.paraph}>
                                        <Grid item xs={2}>Members</Grid>
                                        <Grid item xs={10}>
                                            <div>
                                                <Button onClick={() => this.handleOpenAdd('MEMBER')} size="medium" color="primary" className={classes.icon_add}><AddIcon /></Button>
                                                {projectMembers.map((member, index) => (
                                                    <TagMember key={index} member={member} removeMember={this.removeMember} />
                                                ))}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} >
                                <Paper className={classes.member} >
                                    <div className={classes.title}>
                                        <div>Activity</div>
                                    </div>
                                    <div className={classes.divider} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog onClose={this.handleCloseAdd} aria-labelledby="simple-dialog-title" open={this.state.openAdd}>
                    <DialogTitle id="simple-dialog-title">Select employee</DialogTitle>
                    <List>
                        {freeEmployees.length !== 0 ? freeEmployees.map((member, index) => (
                            <ListItem button onClick={() => this.handleListItemClick(member, this.state.roleAdd)} key={index}>
                                <ListItemAvatar>
                                    {member.imageUrl ? (
                                        <Avatar src={member.imageUrl} round="20px" size="30" />
                                    ) : (
                                            <Avatar name={this.getName(member)} round="20px" size="30" />
                                        )
                                    }
                                </ListItemAvatar>
                                <ListItemText primary={member.email} />
                            </ListItem>
                        )) : (
                                <ListItemText primary="No employee" />
                            )}
                    </List>
                </Dialog>
            </React.Fragment>
        );
    }
}
ProjectDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    projectItem: PropTypes.object.isRequired,
    freeEmployees: PropTypes.array.isRequired,
    updateFreeEmployee: PropTypes.func.isRequired,
};
export default withStyles(styles)(withAlert()(ProjectDetails));