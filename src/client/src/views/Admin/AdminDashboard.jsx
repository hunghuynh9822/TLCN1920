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
import Card from '@material-ui/core/Card';
//
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import AssignmentLate from '@material-ui/icons/AssignmentLate';
import Feedback from '@material-ui/icons/Feedback';

//
import { CustomLineChart } from '../../components';
import PieChart from '../../components/Chart/PieChart.jsx'
import BarChartNgang from '../../components/Chart/BarChartNgang.jsx'

import { Loading, DrilldownChart, StackedBarChart, DoughnutChart } from '../../components'
import { TotalUsers } from '../../components'
//
import { getNumberTasksByAdmin, getNumberTasksByEmployee, getTasksOfEmployeeInProject } from '../../action/report';
import { getTasksOfAllEmployeeInProject, getOverviewCount, getOverviewCountTaskState } from '../../action/report';
import { loginAsAdmin, loginAsLead, loginAsStaff } from '../../action/auth';

const styles = theme => ({
    container: {
        maxWidth: '100%',
        margin: '0px',
    },
    gridroot: {
        margin: 0,
        // marginTop: '75px'
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
    card: {
        width: '100%',
        height: 'auto',
        margin: theme.spacing(2),
        position: 'relative',
        textAlign: 'center',
        color: '#bfbfbf'
    },
    iconProject: {
        color: '#FFFFFF',
        backgroundColor: '#e53935',
    },
    iconUser: {
        color: '#FFFFFF',
        backgroundColor: '#43a047',
    },
    iconRequest: {
        color: '#FFFFFF',
        backgroundColor: '#fb8c00',
    },
    iconNotification: {
        color: '#FFFFFF',
        backgroundColor: '#3f51b5',
    }
});

const mapState = {
    "NEW": "#4f81bc",
    "DEVELOPING": "#c0504f",
    "DEVELOPED": "#9bbb58",
    "TESTING": "#23bfaa",
    "DONE": "#8064a1",
    "FINISH": "#4aacc6"
}

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
            mapColor: {},
            loadingAssignToMe: false,
            dataAssignToMe: {
                dataPoints: [],
                total: 0
            },
            loadingCreateByMe: false,
            dataCreateByMe: {
                dataPoints: [],
                total: 0
            },
            reportCount: {
                employee: 0,
                notify: 0,
                project: 0,
                request: 0
            }
        }
        this.loadDataViewTaskChart = this.loadDataViewTaskChart.bind(this);
        this.loadDataDetail = this.loadDataDetail.bind(this);
        this.loadStackedBarChart = this.loadStackedBarChart.bind(this);
        this.loadChart = this.loadChart.bind(this);

        this.createDataNumberTaskOfProject = this.createDataNumberTaskOfProject.bind(this);
        this.addColorMap = this.addColorMap.bind(this);
        this.getColorMap = this.getColorMap.bind(this);
        this.loadStatistic = this.loadStatistic.bind(this);
    }

    createDataNumberTaskOfProject(id, number, projectTitle) {
        let color = randomColor({
            // luminosity: 'bright',
            luminosity: 'dark',
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
        let color = randomColor({
            // luminosity: 'bright',
            luminosity: 'dark',
            // hue: 'blue'
        });
        let mapColor = this.state.mapColor;
        let targetColor = mapColor[id];
        console.log("[getColorMap] ", targetColor)
        return mapColor[id] ? mapColor[id] : color;
    }

    getViewTaskChartOption(total) {
        return {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Overview number task of project",
                fontSize: 30,
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                fontWeight: "normal",
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
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                fontWeight: "normal",
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
            getNumberTasksByEmployee(currentUser.id)
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
            axisX: {
                interval: 1
            },
            axisY: {
                gridThickness: 0,
                lineThickness: 1,
                interval: 1
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
                text: "Overview number tasks of employee",
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                fontWeight: "normal",
            },
            toolTip: {
                shared: true,
                // content: "{y} task"
            },
            legend: {
                cursor: "pointer",
            },
            axisX: {
                interval: 1,
            },
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
                                value.color = this.getColorMap(value.id);
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
        } else if (loginAsLead(loginRole) || loginAsStaff(loginRole)) {
            getNumberTasksByEmployee(currentUser.id)
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
                                value.color = this.getColorMap(value.id);
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
                    alert.error('Oops! Something went wrong when get number tasks report of lead ' + currentUser.id + '. Please try again!');
                })
            // .finally(() => {
            //     this.setState({
            //         loadingViewTasksChart: false,
            //         numberTasks: numberTasks,
            //         viewTaskChartOption: viewTaskChartOption
            //     })
            // });
        } else {
            alert.error('Oops! You do not have permision !');
        }
    }

    loadStatistic() {
        const { alert } = this.props;
        const { currentUser, loginRole } = this.props;
        this.setState({
            loadingCreateByMe: true,
            loadingAssignToMe: true
        })
        getOverviewCountTaskState(currentUser.id)
            .then((response) => {
                console.log("[Dashboard] Count task state ", response);
                let dataAssignToMe = this.state.dataAssignToMe;
                let dataCreateByMe = this.state.dataCreateByMe;
                response.data["assignToMe"].forEach(value => {
                    dataAssignToMe.total = dataAssignToMe.total + value.number;
                });
                dataAssignToMe.dataPoints = response.data["assignToMe"].map((value, index) => {
                    let name = value.state[0].toUpperCase() + value.state.slice(1).toLowerCase();
                    return { name: name, y: value.number, color: mapState[value.state], percent: Math.round(value.number / dataAssignToMe.total * 100 * 100) / 100 }
                });
                //
                response.data["createByMe"].forEach(value => {
                    dataCreateByMe.total = dataCreateByMe.total + value.number;
                });
                dataCreateByMe.dataPoints = response.data["createByMe"].map((value, index) => {
                    let name = value.state[0].toUpperCase() + value.state.slice(1).toLowerCase();
                    return { name: name, y: value.number, color: mapState[value.state], percent: Math.round(value.number / dataCreateByMe.total * 100 * 100) / 100 }
                });
                this.setState({
                    dataAssignToMe: dataAssignToMe,
                    dataCreateByMe: dataCreateByMe,
                    loadingCreateByMe: false,
                    loadingAssignToMe: false
                })
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong when get number count task state. Please try again!');
            }).finally(() => {

            });
        getOverviewCount()
            .then((response) => {
                console.log("[Dashboard] Count report", response);
                this.setState({
                    reportCount: response
                })
            }).catch(error => {
                console.log(error);
                alert.error('Oops! Something went wrong when get number count report. Please try again!');
            }).finally(() => {

            });

    }

    componentDidMount() {
        // this.loadDataViewTaskChart();
        // this.loadStackedBarChart();
        this.loadChart();
        this.loadStatistic();
    }

    render() {
        const { classes } = this.props;
        const { currentUser, loginRole } = this.props;
        return (
            <Container className={classes.container}>
                <Grid container spacing={3} className={classes.gridroot}>
                    <Grid xs={12} container spacing={3} direction="row">
                        <Grid item xs={3}>
                            <TotalUsers title="TOTAL PROJECTS" icon={InsertChartIcon} iconstyle={classes.iconProject} value={this.state.reportCount.project} />
                        </Grid>
                        <Grid item xs={3}>
                            <TotalUsers title="TOTAL USERS" icon={PeopleIcon} iconstyle={classes.iconUser} value={this.state.reportCount.employee} />
                        </Grid>
                        <Grid item xs={3}>
                            <TotalUsers title="TOTAL REQUESTS" icon={AssignmentLate} iconstyle={classes.iconRequest} value={this.state.reportCount.request} />
                        </Grid>
                        <Grid item xs={3}>
                            <TotalUsers title="TOTAL NOTIFICATIONS" icon={Feedback} iconstyle={classes.iconNotification} value={this.state.reportCount.notify} />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container spacing={3} direction="row">
                        <Grid item xs={5} spacing={3} direction="column">
                            <Grid item xs={12} >
                                {
                                    this.state.loadingCreateByMe ? <Loading /> : <DoughnutChart title="Create by me" data={this.state.dataCreateByMe} />
                                }
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    this.state.loadingAssignToMe ? <Loading /> : <DoughnutChart title="Assign to me" data={this.state.dataAssignToMe} />
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={7}>
                            {
                                this.state.loadingViewTasksChart ? <Loading /> : <DrilldownChart dataOnLoad={this.state.numberTasks} options={this.state.viewTaskChartOption} loadDetail={this.loadDataDetail} />
                            }
                        </Grid>
                    </Grid>
                    <Grid xs={12} container spacing={3} direction="row">
                        <Grid item xs={12}>
                            {
                                this.state.loadingStackedBarChart ? <Loading /> : <StackedBarChart dataOnLoad={this.state.taskOfEmployeeByProject} options={this.state.stackedBarChartOption} />
                            }
                        </Grid>
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