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

class DoughnutChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {}
		}
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.renderChart = this.renderChart.bind(this);
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
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

	toggleDataSeries(e) {
		if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}

	renderChart() {
		let chart = this.chart;
		// let { options } = this.props;
		// let data = this.getOnLoadData();
		chart.options = {
			animationEnabled: true,
			subtitles: [{
				text: this.props.title,
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				indexLabelPlacement: "inside",
				innerRadius: "90%",
				// showInLegend: true,
				// indexLabel: "{y}",//{name}: 
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ name: "Unsatisfied", y: 5 },
					{ name: "Very Unsatisfied", y: 31 },
					{ name: "Very Satisfied", y: 40 },
					{ name: "Satisfied", y: 17 },
					{ name: "Neutral", y: 7 }
				]
			}]
		};
		// chart.options.data = data;
		chart.options.legend = {
			cursor: "pointer",
			itemclick: this.toggleDataSeries,
			horizontalAlign: "right", // "center" , "right"
			verticalAlign: "center",  // "top" , "bottom"
		};
		chart.render();
		console.log("[StackedBarChart] Render chart ", chart)
	}

	render() {
		return (
			<Card style={{ color: '#bfbfbf', marginTop: '10px' }}>
				<CanvasJSChart options={this.state.options}
					onRef={this.setWrapperRef}
					containerProps={{
						width: '200px', height: '200px'
					}}
				/>
			</Card>
		);
	}
}
DoughnutChart.propTypes = {
	// options: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired
};
export default DoughnutChart;       