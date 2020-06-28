/* App.js */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
					dataPoints: taskOfEmployee
				}];
				chart.options = optionDataDetail;
				chart.options.data = data;
				chart.options.title = { text: input.dataPoint.name }
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
			innerRadius: "75%",
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
		this.options = {
			"New vs Returning Visitors": [{
				click: this.onClickChartDrilldownHandler,
				cursor: "pointer",
				explodeOnClick: false,
				innerRadius: "75%",
				legendMarkerType: "square",
				name: "New vs Returning Visitors",
				radius: "100%",
				showInLegend: true,
				startAngle: 90,
				type: "doughnut",
				dataPoints: [
					{ y: 522460, name: "New Visitors", color: "#E7823A" },
					{ y: 307040, name: "Returning Visitors", color: "#546BC1" }
				]
			}],
			"New Visitors": [{
				color: "#E7823A",
				name: "New Visitors",
				type: "column",
				dataPoints: [
					{ x: new Date("1 Jan 2017"), y: 37000 },
					{ x: new Date("1 Feb 2017"), y: 39960 },
					{ x: new Date("1 Mar 2017"), y: 41160 },
					{ x: new Date("1 Apr 2017"), y: 42240 },
					{ x: new Date("1 May 2017"), y: 42200 },
					{ x: new Date("1 Jun 2017"), y: 43600 },
					{ x: new Date("1 Jul 2017"), y: 45560 },
					{ x: new Date("1 Aug 2017"), y: 47280 },
					{ x: new Date("1 Sep 2017"), y: 48800 },
					{ x: new Date("1 Oct 2017"), y: 52720 },
					{ x: new Date("1 Nov 2017"), y: 56840 },
					{ x: new Date("1 Dec 2017"), y: 58400 }
				]
			}],
			"Returning Visitors": [{
				color: "#546BC1",
				name: "Returning Visitors",
				type: "column",
				dataPoints: [
					{ x: new Date("1 Jan 2017"), y: 19000 },
					{ x: new Date("1 Feb 2017"), y: 21040 },
					{ x: new Date("1 Mar 2017"), y: 21840 },
					{ x: new Date("1 Apr 2017"), y: 22760 },
					{ x: new Date("1 May 2017"), y: 24800 },
					{ x: new Date("1 Jun 2017"), y: 24400 },
					{ x: new Date("1 Jul 2017"), y: 25440 },
					{ x: new Date("1 Aug 2017"), y: 27720 },
					{ x: new Date("1 Sep 2017"), y: 27200 },
					{ x: new Date("1 Oct 2017"), y: 29280 },
					{ x: new Date("1 Nov 2017"), y: 31160 },
					{ x: new Date("1 Dec 2017"), y: 32400 }
				]
			}]
		}
		const buttonStyle = {
			bordeRadius: '4px',
			padding: '8px',
			border: 'none',
			fontSize: '16px',
			backgroundColor: '#2eacd1',
			color: 'white',
			position: 'absolute',
			top: '65px',
			left: '40px',
			cursor: 'pointer',
			backgroundColor: '#3f51b5',
		}
		return (
			<div>
				<CanvasJSChart options={this.options}
					onRef={this.setWrapperRef}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
				<button className="btn invisible" id="backButton" style={buttonStyle}>&lt; Back</button>
			</div>
		);
	}
}
DrilldownChart.propTypes = {
	dataOnLoad: PropTypes.array.isRequired,
	options: PropTypes.object.isRequired,
	loadDetail: PropTypes.func.isRequired
};
export default DrilldownChart;       