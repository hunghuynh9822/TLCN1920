import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import classnames from 'classnames';
import randomColor from 'randomcolor'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { CustomLineChart } from '../../components';
import PieChart from '../../components/Chart/PieChart.jsx'
import BarChartNgang from '../../components/Chart/BarChartNgang.jsx'
import { Loading, DrilldownChart, StackedBarChart } from '../../components'
//
import { getNumberTasksByAdmin, getNumberTasksByLead, getTasksOfEmployeeInProject } from '../../action/task';
import { getTasksOfAllEmployeeInProject } from '../../action/project';
import { loginAsAdmin, loginAsLead } from '../../action/auth';

const styles = theme => ({
    container: {
        maxWidth: '1280px',
    },
    gridroot: {
        margin: 0,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberTasks: new Array(),
            loadingViewTasksChart: false,
            viewTaskChartOption: {},

            taskOfEmployeeByProject: new Array(),
            loadingStackedBarChart: false,
            stackedBarChartOption: {},

            mapColor: {}
        }
        this.loadDataViewTaskChart = this.loadDataViewTaskChart.bind(this);
        this.loadDataDetail = this.loadDataDetail.bind(this);
        this.loadStackedBarChart = this.loadStackedBarChart.bind(this);
        this.loadChart = this.loadChart.bind(this);

        this.createDataNumberTaskOfProject = this.createDataNumberTaskOfProject.bind(this);
        this.addColorMap = this.addColorMap.bind(this);
        this.getColorMap = this.getColorMap.bind(this);
    }

    createDataNumberTaskOfProject(id, number, projectTitle) {
        let color = randomColor({
            luminosity: 'bright',
            // hue: 'blue'
        });
        let y = number;
        let name = projectTitle;
        this.addColorMap(id, color);
        return { id, y, name, color };
    }

    addColorMap(id, color) {
        let mapColor = this.state.mapColor;
        mapColor[id] = color;
        this.setState({
            mapColor: mapColor
        })
    }

    getColorMap(id) {
        let mapColor = this.state.mapColor;
        return mapColor[id];
    }

    getViewTaskChartOption(total) {
        return {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Overview number task of project"
            },
            // subtitles: [{
            // 	text: "Click on Any Segment to Drilldown",
            // 	backgroundColor: "#2eacd1",
            // 	fontSize: 16,
            // 	fontColor: "white",
            // 	padding: 5
            // }],
            legend: {
                horizontalAlign: "right", // "center" , "right"
                verticalAlign: "center",  // "top" , "bottom"
                fontFamily: "calibri",
                fontSize: 14,
                itemTextFormatter: function (e) {
                    return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / total * 100) + "%";
                }
            },
            data: []
        }
    }

    loadDataViewTaskChart() {
        const { alert } = this.props;
        const { currentUser, loginRole } = this.props;
        let numberTasks = this.state.numberTasks;
        let viewTaskChartOption = this.state.viewTaskChartOption;
        if (loginAsAdmin(loginRole)) {
            getNumberTasksByAdmin()
                .then(response => {
                    console.log("[Dashboard] numberTasks ", response.data.numberTasks);
                    numberTasks = response.data.numberTasks.map((value, index) => {
                        return this.createDataNumberTaskOfProject(value.id, value.number, value.name);
                    });
                    numberTasks.sort((a, b) => {
                        return b.y - a.y
                    })
                    viewTaskChartOption = this.getViewTaskChartOption(response.data.total);
                }).catch(error => {
                    console.log(error);
                    alert.error('Oops! Something went wrong when get number tasks report of admin. Please try again!');
                }).finally(() => {
                    this.setState({
                        loadingViewTasksChart: false,
                        numberTasks: numberTasks,
                        viewTaskChartOption: viewTaskChartOption
                    })
                });
        } else if (loginAsLead(loginRole)) {
            getNumberTasksByLead(currentUser.id)
                .then(response => {
                    console.log("[Dashboard] numberTasks ", response.data.numberTasks);
                    numberTasks = response.data.numberTasks.map((value, index) => {
                        return this.createDataNumberTaskOfProject(value.id, value.number, value.name);
                    });
                    numberTasks.sort((a, b) => {
                        return b.y - a.y
                    })
                    viewTaskChartOption = this.getViewTaskChartOption(response.data.total);
                }).catch(error => {
                    console.log(error);
                    alert.error('Oops! Something went wrong when get number tasks report of lead ' + currentUser.id + '. Please try again!');
                }).finally(() => {
                    this.setState({
                        loadingViewTasksChart: false,
                        numberTasks: numberTasks,
                        viewTaskChartOption: viewTaskChartOption
                    })
                });
        } else {
            alert.error('Oops! You do not have permision !');
        }
    }

    createDataDetail(nameEmployee, number) {
        let label = nameEmployee;
        let y = number
        return { label, y }
    }
    getDetailChartOption() {
        return {
            animationEnabled: true,
            theme: "light2",
            axisY: {
                gridThickness: 0,
                includeZero: false,
                lineThickness: 1
            },
            data: []
        };
    }

    loadDataDetail(project) {
        const { alert } = this.props;
        return getTasksOfEmployeeInProject(project)
            .then(response => {
                console.log("[Dashboard] taskOfEmployee ", response.data.taskOfEmployee);
                let taskOfEmployee = response.data.taskOfEmployee.map((value, index) => {
                    return this.createDataDetail(value.name, value.number)
                })
                taskOfEmployee.sort((a, b) => {
                    return b.y - a.y
                })
                let optionDataDetail = this.getDetailChartOption();
                return { optionDataDetail, taskOfEmployee }
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong when get task of employee in project. Please try again!');
            })
    }

    getStackedBarOption() {
        let options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Overview employee"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
            }
        }
        return options
    }

    loadStackedBarChart() {
        const { alert } = this.props;
        const { currentUser, loginRole } = this.props;
        let taskOfEmployeeByProject = this.state.taskOfEmployeeByProject;
        let stackedBarChartOption = this.state.stackedBarChartOption;
        if (loginAsAdmin(loginRole)) {
            getTasksOfAllEmployeeInProject()
                .then(response => {
                    console.log("[Dashboard] taskEmployee ", response.data.taskEmployee);
                    taskOfEmployeeByProject = response.data.taskEmployee
                    stackedBarChartOption = this.getStackedBarOption();
                }).catch(error => {
                    console.log(error);
                    alert.error('Oops! Something went wrong when get number tasks report of admin. Please try again!');
                }).finally(() => {
                    this.setState({
                        loadingStackedBarChart: false,
                        taskOfEmployeeByProject: taskOfEmployeeByProject,
                        stackedBarChartOption: stackedBarChartOption
                    })
                });
        } else if (loginAsLead(loginRole)) {
            alert.error('Oops! Not support !');
        } else {
            alert.error('Oops! You do not have permision !');
        }
    }

    loadChart() {
        const { alert } = this.props;
        const { currentUser, loginRole } = this.props;
        let numberTasks = this.state.numberTasks;
        let viewTaskChartOption = this.state.viewTaskChartOption;
        let taskOfEmployeeByProject = this.state.taskOfEmployeeByProject;
        let stackedBarChartOption = this.state.stackedBarChartOption;
        this.setState({
            loadingStackedBarChart: true,
            loadingViewTasksChart: true,
        })
        if (loginAsAdmin(loginRole)) {
            getNumberTasksByAdmin()
                .then(response => {
                    console.log("[Dashboard] numberTasks ", response.data.numberTasks);
                    numberTasks = response.data.numberTasks.map((value, index) => {
                        return this.createDataNumberTaskOfProject(value.id, value.number, value.name);
                    });
                    numberTasks.sort((a, b) => {
                        return b.y - a.y
                    })
                    viewTaskChartOption = this.getViewTaskChartOption(response.data.total);
                    getTasksOfAllEmployeeInProject()
                        .then(response => {
                            console.log("[Dashboard] taskEmployee ", response.data.taskEmployee);
                            // console.log("[Dashboard] mapColor ", this.state.mapColor);
                            taskOfEmployeeByProject = response.data.taskEmployee.map((value, index) => {
                                value.color = this.state.mapColor[value.id];
                                // console.log("[Dashboard] mapColor id " + value.id + " color " + value.color);
                                return value;
                            })
                            stackedBarChartOption = this.getStackedBarOption();
                        }).catch(error => {
                            console.log(error);
                            alert.error('Oops! Something went wrong when get number tasks report of admin. Please try again!');
                        }).finally(() => {
                            this.setState({
                                loadingViewTasksChart: false,
                                numberTasks: numberTasks,
                                viewTaskChartOption: viewTaskChartOption,
                                loadingStackedBarChart: false,
                                taskOfEmployeeByProject: taskOfEmployeeByProject,
                                stackedBarChartOption: stackedBarChartOption
                            })
                        });
                }).catch(error => {
                    console.log(error);
                    alert.error('Oops! Something went wrong when get number tasks report of admin. Please try again!');
                })
        } else if (loginAsLead(loginRole)) {
            getNumberTasksByLead(currentUser.id)
                .then(response => {
                    console.log("[Dashboard] numberTasks ", response.data.numberTasks);
                    numberTasks = response.data.numberTasks.map((value, index) => {
                        return this.createDataNumberTaskOfProject(value.id, value.number, value.name);
                    });
                    numberTasks.sort((a, b) => {
                        return b.y - a.y
                    })
                    viewTaskChartOption = this.getViewTaskChartOption(response.data.total);
                }).catch(error => {
                    console.log(error);
                    alert.error('Oops! Something went wrong when get number tasks report of lead ' + currentUser.id + '. Please try again!');
                }).finally(() => {
                    this.setState({
                        loadingViewTasksChart: false,
                        numberTasks: numberTasks,
                        viewTaskChartOption: viewTaskChartOption
                    })
                });
        } else {
            alert.error('Oops! You do not have permision !');
        }
    }

    componentDidMount() {
        // this.loadDataViewTaskChart();
        // this.loadStackedBarChart();
        this.loadChart();
    }

    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3} className={classes.gridroot}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        {
                            this.state.loadingViewTasksChart ? <Loading /> : <DrilldownChart dataOnLoad={this.state.numberTasks} options={this.state.viewTaskChartOption} loadDetail={this.loadDataDetail} />
                        }
                        {
                            this.state.loadingStackedBarChart ? <Loading /> : <StackedBarChart dataOnLoad={this.state.taskOfEmployeeByProject} options={this.state.stackedBarChartOption} />
                        }
                        {/* <BarChartNgang /> */}
                        {/* <Drilldown /> */}
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
AdminDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.auth.currentUser,
        currentRole: state.auth.currentRole,
        loginRole: state.auth.loginRole,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withAlert()(AdminDashboard)));