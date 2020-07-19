import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import PieChart from '../../../components/Chart/PieChart.jsx'
import PieBarChart from '../../../components/Chart/PieBarChart.jsx'
import BarChartNgang from '../../../components/Chart/BarChartNgang.jsx'
import { Loading } from '../../../components';
import { getTasksWithStateOfProject, getTasksAssigneeWithStateOfProject, TASK_STATE } from '../../../action/task'

const styles = theme => ({

});
class ProjectAnalytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingStateChart: false,
            dataTaskState: [],
            loadingBarChart: false,
            dataBarChart: [],
        }
        this.loadData = this.loadData.bind(this);
        this.findEmployee = this.findEmployee.bind(this);
    }

    getName(employee) {
        return employee.lastName + " " + employee.firstName;
    }

    findEmployee(employeeId) {
        const { projectItem } = this.props;
        let members = projectItem.members;
        let employee = members.find((member) => {
            return member.id == employeeId
        })
        return this.getName(employee);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index == 3) {
            this.loadData();
        }
    }

    loadData() {
        this.setState({
            loadingStateChart: true,
            loadingBarChart: true
        })
        const { alert } = this.props;
        const { projectItem } = this.props;
        let projectId = projectItem.project.id;
        let members = projectItem.members;
        // console.log("ANALYTICS : members " + JSON.stringify(members))
        var dataState = [];
        getTasksWithStateOfProject(projectId)
            .then(response => {
                console.log(response);
                let tasksState = response.tasks;
                let totalTasks = 0;
                TASK_STATE.forEach((state) => {
                    if (tasksState[state]) {
                        totalTasks += tasksState[state].length;
                    }
                })
                TASK_STATE.forEach((state) => {
                    if (tasksState[state]) {
                        let percent = (tasksState[state].length / totalTasks) * 100;
                        dataState.push({ name: state, y: percent, number: totalTasks });
                    } else {
                        dataState.push({ name: state, y: 0, number: 0 });
                    }
                })
                // console.log("DATA STATE : " + JSON.stringify(dataState))
                this.setState({
                    loadingStateChart: false,
                    dataTaskState: dataState,

                })
            }).catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
                this.setState({
                    loadingStateChart: false,
                })
            });
        var dataBarChart = [];

        getTasksAssigneeWithStateOfProject(projectId)
            .then(response => {
                console.log(response);
                let paserData = [];
                let assignTasks = response.assignTasks;
                assignTasks.forEach((assignee) => {
                    let name = this.findEmployee(assignee.assigneeId);
                    let assigneeState = {};
                    let tasks = assignee.tasks.tasks;
                    console.log("TASK : " + JSON.stringify(tasks));
                    let totalTasks = 0;
                    TASK_STATE.forEach((state) => {
                        if (tasks[state]) {
                            totalTasks += tasks[state].length;
                        }
                    })
                    TASK_STATE.forEach((state) => {
                        if (tasks[state]) {
                            let percent = (tasks[state].length / totalTasks) * 100;
                            assigneeState[state] = {
                                percent: percent,
                                number: totalTasks,
                            };
                        } else {
                            // assigneeState[state] = 0;
                        }
                    })
                    paserData.push({ employee: name, assigneeState: assigneeState })
                })
                console.log("[Project] PASER DATA " + JSON.stringify(paserData))

                TASK_STATE.forEach((state) => {
                    let dataPercent = [];
                    paserData.forEach((assignee) => {
                        let data = assignee.assigneeState[state];
                        if (data != undefined) {
                            dataPercent.push({ label: assignee.employee, y: data.percent, number: data.number })
                        } else {
                            dataPercent.push({ label: assignee.employee, y: 0, number: 0 })
                        }
                    })
                    dataBarChart.push({ name: state, data: dataPercent })
                })
                console.log("[Project] DATA BAR CHART" + JSON.stringify(dataBarChart))
                this.setState({
                    loadingBarChart: false,
                    dataBarChart: dataBarChart,

                })
            }).catch(error => {
                console.log(error);
                //(error && error.message) || 
                alert.error('Oops! Something went wrong. Please try again!');
                this.setState({
                    loadingBarChart: false,
                })
            });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        const { classes } = this.props;
        const { projectItem } = this.props;
        return (
            <React.Fragment>
                {
                    this.state.loadingStateChart ? <Loading /> : <PieChart data={this.state.dataTaskState} />
                }
                {
                    this.state.loadingBarChart ? <Loading /> : <BarChartNgang dataInput={this.state.dataBarChart} />
                }
                {/* <PieBarChart /> */}
            </React.Fragment>
        );
    }
}
ProjectAnalytics.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state, ownProps) => {
    return {
        projectItem: state.project.projectItem,
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
        loginRole: state.auth.loginRole,
        // creatorTasks: state.tasks.creatorTasks,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(ProjectAnalytics)));