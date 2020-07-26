/* App.js */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//
import Card from '@material-ui/core/Card';
//
import CanvasJSReact from './canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var $ = require('jquery');

class DrilldownChart extends Component {
	constructor(props) {
		super(props);
		this.options = {};
		this.onClickChartDrilldownHandler = this.onClickChartDrilldownHandler.bind(this);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.getOnLoadData = this.getOnLoadData.bind(this);
		this.getDataDetail = this.getDataDetail.bind(this);
	}

	onClickChartDrilldownHandler(e) {
		this.getDataDetail(e);
	}

	getDataDetail(input) {
		let { loadDetail } = this.props;
		loadDetail(input.dataPoint.id)
			.then(dataOption => {
				var chart = this.chart;
				let optionDataDetail = dataOption.optionDataDetail;
				let taskOfEmployee = dataOption.taskOfEmployee;
				let data = [{
					color: input.dataPoint.color,
					name: input.dataPoint.name,
					type: "column",
					dataPoints: taskOfEmployee,
				}];
				chart.options = optionDataDetail;
				chart.options.data = data;
				chart.options.title = {
					text: input.dataPoint.name,
					fontFamily: "Roboto, Helvetica, Arial, sans-serif",
					fontWeight: "normal",
					fontSize: 30,
				}
				chart.render();
				$("#backButton").toggleClass("invisible");
			})
	}

	getOnLoadData() {
		let { dataOnLoad } = this.props;
		return [{
			click: this.onClickChartDrilldownHandler,
			cursor: "pointer",
			explodeOnClick: false,
			innerRadius: "0%",
			legendMarkerType: "square",
			// name: "New vs Returning Visitors",
			radius: "100%",
			showInLegend: true,
			startAngle: 90,
			type: "doughnut",
			dataPoints: dataOnLoad
		}]
	}

	componentDidMount() {
		let chart = this.chart;
		let { dataOnLoad, options } = this.props;
		let getOnLoadData = this.getOnLoadData();
		chart.options = options;
		chart.options.data = getOnLoadData;
		chart.render();
		console.log("[DrilldownChart] render chart ", chart)
		$("#backButton").click(function () {
			$(this).toggleClass("invisible");
			chart.options = options;
			chart.options.data = getOnLoadData;
			chart.render();
		});
	}

	setWrapperRef(node) {
		this.chart = node;
	}

	componentWillReceiveProps() {
		let chart = this.chart;
		let { dataOnLoad, options } = this.props;
		let getOnLoadData = this.getOnLoadData();
		chart.options = options;
		chart.options.data = getOnLoadData;
		chart.render();
	}

	render() {
		const buttonStyle = {
			top: '242px',
			bordeRadius: '4px',
			padding: '8px',
			border: 'none',
			fontSize: '16px',
			backgroundColor: 'white',
			color: 'black',
			position: 'absolute',
			// top: '60px',
			// left: '40px',
			cursor: 'pointer',
			// backgroundColor: '#3f51b5',
		}
		return (
			<Card style={{ width: '100%', color: '#bfbfbf', marginTop: '10px' }}>
				<CanvasJSChart options={this.options}
					onRef={this.setWrapperRef}
					containerProps={{
						width: '100%', height: '510px'
					}}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
				<button className="btn invisible" id="backButton" style={buttonStyle}>Back</button>
			</Card>
		);
	}
}
DrilldownChart.propTypes = {
	dataOnLoad: PropTypes.array.isRequired,
	options: PropTypes.object.isRequired,
	loadDetail: PropTypes.func.isRequired
};
export default DrilldownChart;       