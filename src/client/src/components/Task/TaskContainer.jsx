import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

import Slider from "react-slick";

import classNames from "classnames";
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { updateProjectTasks } from '../../action/task';
import { loginAsAdmin, loginAsLead, loginAsStaff } from '../../action/auth';

import { changeAssignee } from '../../action/task'
import { TaskCard } from '../../components'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    slider: {
        width: '100%',
        minHeight: '100%',
        padding: '0px 20px',
    }
});
class TaskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectTasks: {
                projectId: null,
                tasks: new Array(),
            },
        }
        this.getMember = this.getMember.bind(this);
        this.move = this.move.bind(this);
        this.getList = this.getList.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.canDnd = this.canDnd.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { projectTasks } = this.props;
        console.log("[TaskContainer] componentWillReceiveProps projectTasks : ", projectTasks)
        this.setState({
            projectTasks: projectTasks
        })
        // this.setState({
        //     reload: true
        // })
    }

    componentDidMount() {
        const { projectTasks } = this.props;
        this.setState({
            projectTasks: projectTasks
        })
    }

    getMember(memberId) {
        const { projectItem } = this.props;
        let members = projectItem.members;
        return members.filter((member) => {
            return member.id === memberId;
        })[0];
    }

    getName(employee) {
        if (employee) {
            return employee.lastName + " " + employee.firstName;
        }
        return 'UnknownMember'
    }

    getNameMember(memberId) {
        return this.getName(this.getMember(memberId));
    }

    // a little function to help us with reordering the result
    // reorder(list, startIndex, endIndex) {
    //     const result = Array.from(list);
    //     const [removed] = result.splice(startIndex, 1);
    //     result.splice(endIndex, 0, removed);

    //     return result;
    // };

    /**
 * Moves an item from one list to another list.
 */
    move(source, destination, droppableSource, droppableDestination) {
        console.log("[dnd] Move ", "source", source, "destination", destination, "drop source", droppableSource, "drop destination", droppableDestination)
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    getList(cardId) {
        let { index } = this.props;
        let { projectTasks } = this.state;
        let taskCards = projectTasks.tasks;
        let card = taskCards.filter((taskCard) => {
            return taskCard.assigneeId == cardId;
        })[0];
        let tasks = card && card.tasks ? card.tasks : [];
        let doTasks = tasks.filter((task) => {
            return task.state != 'FINISH' && task.state != 'DONE';
        });
        let finishTasks = tasks.filter((task) => {
            return task.state == 'FINISH';
        });
        let doneTasks = tasks.filter((task) => {
            return task.state == 'DONE';
        });
        console.log("[dnd] getList : ", doTasks, doneTasks, finishTasks)
        return { doTasks, doneTasks, finishTasks };
    }

    canDnd(targetTask) {
        const { loginRole, currentUser } = this.props;
        let temp = "LOGIN ON " + loginRole;
        if (targetTask) {
            temp = temp.concat(" ADMIN " + loginAsAdmin(loginRole));
            temp = temp.concat(" LEAD " + loginAsLead(loginRole));
            temp = temp.concat(" STAFF " + loginAsStaff(loginRole));
            console.log("[TaskContainer] ", currentUser, temp, targetTask);
            if (loginAsAdmin(loginRole)) {
                return { verified: true };
            }
            if (loginAsLead(loginRole)) {
                if (targetTask.employeeCreator == currentUser.id) {
                    return { verified: true };
                }
                return { verified: false, message: 'Oops! You do not permision to change task ' + targetTask.title };
            }
            if (loginAsStaff(loginRole)) {
                return { verified: false, message: 'Oops! You do not permision to change task ' + targetTask.title };
            }
            return { verified: false, message: 'Oops! Can not detect login role on ' + targetTask.title };
        }
        return { verified: false, message: 'Oops! Undefined task !!!' };
    }

    /**onDragEnd : {"draggableId":"15752273449756","type":"DEFAULT","source":{"index":0,"droppableId":"15746071512232"},"reason":"DROP","mode":"FLUID","destination":{"droppableId":"15746072843063","index":0},"combine":null} */
    /**
     * draggableId: taskId
     * source : {
     *      droppableId: oldAssigneeId
     * }
     * destination: {
     *      droppableId: newAssigneeId
     * }
     */
    onDragEnd(result) {
        const { alert } = this.props;
        const { loginRole, currentUser, projectItem } = this.props;
        // console.log("[TaskContainer] projectItem ", projectItem)
        let { projectTasks } = this.props;
        let taskCards = projectTasks.tasks;
        const { source, destination, draggableId } = result;
        let sourceTasks = this.getList(source.droppableId);
        let sourceArray = sourceTasks.doTasks;
        let destinationTasks = this.getList(destination.droppableId);
        let destinationArray = destinationTasks.doTasks;
        let targetTask = Array.from(sourceArray).splice(source.index, 1)[0];
        console.log("[dnd] onDragEnd ", result)
        let resultCanDnd = this.canDnd(targetTask);
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (!resultCanDnd.verified) {
            alert.error(resultCanDnd.message);
            return;
        }
        if (source.droppableId === destination.droppableId) {
            // console.log("Source : " + JSON.stringify(this.getList(source.droppableId)))
            // const items = reorder(
            //     this.getList(source.droppableId),
            //     source.index,
            //     destination.index
            // );
        } else {
            let requestChange = {
                taskId: draggableId,
                updateEmployeeId: currentUser.id,
                employeeId: destination.droppableId,
                projectId: projectTasks.projectId
            };
            const result = this.move(
                sourceArray,
                destinationArray,
                source,
                destination
            );
            console.log("[dnd] Move result : ", result);
            let items = this.state.items;
            let newTaskCards = taskCards.map((card) => {
                console.log("[dnd] New TaskCards : ", result[card.assigneeId]);
                if (result[card.assigneeId] == undefined) {
                    return card;
                }
                card.tasks = result[card.assigneeId].map((task, index) => {
                    if (task) {
                        task.employeeAssignee = card.assigneeId;
                    }
                    return task;
                });
                if (card.assigneeId == destination.droppableId) {
                    destinationTasks.doneTasks.forEach((task, index) => {
                        card.tasks.push(task);
                    })
                    destinationTasks.finishTasks.forEach((task, index) => {
                        card.tasks.push(task);
                    })
                }
                if (card.assigneeId == source.droppableId) {
                    sourceTasks.doneTasks.forEach((task, index) => {
                        card.tasks.push(task);
                    })
                    sourceTasks.finishTasks.forEach((task, index) => {
                        card.tasks.push(task);
                    })
                }
                return card;
            });
            let memberTasks = taskCards.find(card => {
                return card.assigneeId == destination.droppableId;
            });
            console.log("[dnd] Member TaskCards destination : ", memberTasks);
            if (memberTasks == undefined) {
                console.log("[dnd] ", destination)
                let card = {
                    assigneeId: Number(destination.droppableId),
                    tasks: result[destination.droppableId]
                }
                newTaskCards.push(card);
            }
            projectTasks.tasks = newTaskCards;
            console.log("[dnd] Data render : ", projectTasks);
            this.setState({
                projectTasks: projectTasks
            })
            changeAssignee(requestChange)
                .then(response => {
                    console.log("[dnd] changeAssignee : ", response)
                })
                .catch(error => {
                    console.log(error);
                })
        }
    };

    render() {
        const { classes } = this.props;
        let { projectTasks } = this.state;
        let taskCards = [];
        const settings = {
            className: classNames("center", classes.slider),
            infinite: false,
            centerPadding: "60px",
            slidesToShow: 5,
            swipeToSlide: true,
            afterChange: function (index) {
                console.log(
                    `Slider Changed to: ${index + 1}`
                );
            },
            responsive: [
                {
                    breakpoint: 1650,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        };
        const members = this.props.projectItem.members;
        console.log("[TaskContainer] Render ", members, projectTasks);
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Slider {...settings}>
                            {
                                members.map((member) => {
                                    let title = this.getNameMember(member.id);
                                    let card = projectTasks.tasks.find((card) => {
                                        return card.assigneeId == member.id;
                                    })
                                    let tasks = card && card.tasks ? card.tasks : [];
                                    if (title != "UnknownMember")
                                        return (
                                            <TaskCard loadTasks={this.props.loadTasks} filter={this.props.filter} key={member.id} title={title} cardId={member.id} member={member} tasks={tasks} openForm={this.props.openForm} />
                                        )
                                })
                            }
                        </Slider>
                    </DragDropContext>

                </div>
            </React.Fragment>
        );
    }
}
TaskContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    loadTasks: PropTypes.func.isRequired,
    openForm: PropTypes.func.isRequired,
    // projectTasks: PropTypes.array.isRequired,
};
const mapStateToProps = (state, ownProps) => {
    return {
        projectItem: state.project.projectItem,
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
        loginRole: state.auth.loginRole,
        projectTasks: state.tasks.projectTasks,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProjectTasks: (projectTasks) => dispatch(updateProjectTasks(projectTasks)),
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(TaskContainer)));