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

import { updateCreatorTasks } from '../../action/task';

import { changeAssignee } from '../../action/task'
import { TaskCard } from '../../components'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
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
    }
});
class TaskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskCards: [],
        }
        this.getMember = this.getMember.bind(this);
        this.move = this.move.bind(this);
        this.getList = this.getList.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount() {
        const { creator } = this.props;
        this.setState({
            taskCards: creator.tasks,
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
        return 'Administrator'
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
        let taskCards = this.state.taskCards;
        let card = taskCards.filter((taskCard) => {
            return taskCard.assigneeId == cardId;
        })[0];
        console.log("getList : " + JSON.stringify(card))
        return card.tasks;
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
        const { taskCards } = this.state;
        const { source, destination, draggableId } = result;
        // console.log("onDragEnd : " + JSON.stringify(result))
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            // console.log("Source : " + JSON.stringify(this.getList(source.droppableId)))
            // const items = reorder(
            //     this.getList(source.droppableId),
            //     source.index,
            //     destination.index
            // );
            // let state = { items };

            // this.setState(state);
        } else {
            let requestChange = {
                taskId: draggableId,
                employeeId: destination.droppableId
            };
            const result = this.move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
            // console.log("Move result : " + JSON.stringify(result));
            let items = this.state.items;
            let newTaskCards = taskCards.map((card) => {
                card.tasks = result[card.assigneeId];
                return card;
            });
            // console.log("New TaskCards : " + JSON.stringify(newTaskCards))
            this.setState({
                taskCards: newTaskCards,
            });
            this.props.loadTasks();
            changeAssignee(requestChange)
                .then(response => {
                    console.log("changeAssignee : " + JSON.stringify(response))
                })
                .catch(error => {
                    console.log(error);
                })
        }
    };

    render() {
        const { classes } = this.props;
        const { taskCards } = this.state;
        const settings = {
            className: classNames("center", classes.slider),
            infinite: false,
            centerPadding: "60px",
            slidesToShow: 5,
            swipeToSlide: true,
            adaptiveHeight: true,
            afterChange: function (index) {
                console.log(
                    `Slider Changed to: ${index + 1}`
                );
            },
            responsive: [
                {
                    breakpoint: 1650,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        };
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {/* <Slider {...settings}> */}
                        {taskCards.map((card) => <TaskCard filter={this.props.filter} key={card.assigneeId} title={this.getNameMember(card.assigneeId)} cardId={card.assigneeId} tasks={card.tasks} />)}
                        {/* </Slider> */}
                    </DragDropContext>
                </div>
            </React.Fragment>
        );
    }
}
TaskContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    creator: PropTypes.object.isRequired,
    loadTasks: PropTypes.func.isRequired,
};
const mapStateToProps = (state, ownProps) => {
    return {
        projectItem: state.project.projectItem,
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
        loginRole: state.auth.loginRole,
        creatorTasks: state.tasks.creatorTasks,

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateCreatorTasks: (creatorTasks) => dispatch(updateCreatorTasks(creatorTasks)),
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(TaskContainer)));