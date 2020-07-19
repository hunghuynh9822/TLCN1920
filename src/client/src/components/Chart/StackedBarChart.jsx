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

class StackedBarChart extends Component {
	constructor(props) {
		super(props);
		this.options = {};
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.createListData = this.createListData.bind(this);
		this.renderChart = this.renderChart.bind(this);
		this.getOnLoadData = this.getOnLoadData.bind(this);
	}

	toggleDataSeries(e) {
		console.log("[StackedBar] toggle ", e, this.chart)
		if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}

	setWrapperRef(node) {
		this.chart = node;
	}

	componentDidMount() {
		this.renderChart()
	}

	componentWillReceiveProps() {
		this.renderChart()
	}

	renderChart() {
		let chart = this.chart;
		let { options } = this.props;
		let data = this.getOnLoadData();
		chart.options = options;
		chart.options.data = data;
		chart.options.legend = {
			cursor: "pointer",
			itemclick: this.toggleDataSeries,
			horizontalAlign: "right", // "center" , "right"
			verticalAlign: "center",  // "top" , "bottom"
		};
		chart.render();
		console.log("[StackedBarChart] Render chart ", chart)
	}

	createData(nameEmployee, number) {
		let label = nameEmployee;
		let y = number;
		return { label, y }
	}

	createListData(project) {
		return project.map((value, index) => {
			return this.createData(value.name, value.number)
		})
	}

	getOnLoadData() {
		let { dataOnLoad } = this.props;
		let dataOnServer = dataOnLoad.map((value, index) => {
			return {
				type: "stackedBar",
				name: value.name,
				color: value.color,
				showInLegend: "true",
				dataPoints: this.createListData(value.values),
			};
		})
		return dataOnServer;
	}

	render() {
		return (
			<Card style={{ width: '100%', color: '#bfbfbf', marginTop: '10px' }}>
				<CanvasJSChart options={this.props.options}
					onRef={this.setWrapperRef}
				/>
			</Card>
		);
	}
}
StackedBarChart.propTypes = {
	dataOnLoad: PropTypes.array.isRequired,
	options: PropTypes.object.isRequired,
};
export default StackedBarChart;       