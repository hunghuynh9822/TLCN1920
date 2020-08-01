/* App.js */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
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
		this.renderDetail = this.renderDetail.bind(this);
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
		chart.options = {
			animationEnabled: true,
			subtitles: [{
				text: this.props.data.total,
				verticalAlign: "center",
				fontSize: 50,
				fontWeight: "normal",
				fontFamily: "Roboto, Helvetica, Arial, sans-serif",
				dockInsidePlotArea: true
			}, {
				text: this.props.title,
				verticalAlign: "center",
				fontSize: 24,
				fontWeight: "lighter",
				fontFamily: "Roboto, Helvetica, Arial, sans-serif",
				dockInsidePlotArea: true
			}],
			toolTip: {
				content: "{percent}%"
			},
			data: [{
				type: "doughnut",
				// indexLabelPlacement: "inside",
				innerRadius: "90%",
				// showInLegend: true,
				// indexLabel: "{y}",//{name}: 
				// yValueFormatString: "#,###'%'",
				dataPoints: this.props.data.dataPoints,
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
		chart.subtitles[0].set("padding", { bottom: chart.subtitles[1].get("fontSize") });
		chart.subtitles[1].set("padding", { top: chart.subtitles[0].get("fontSize") });
		console.log("[StackedBarChart] Render chart ", chart)
	}

	renderDetail() {
		console.log("[Dashboard] Doughnut chart ", this.props.data.dataPoints)
		return this.props.data.dataPoints.map((value, index) => {
			let circleStyle = {
				margin: 4,
				display: "inline-block",
				backgroundColor: 'white',
				border: `solid 5px ${value.color}`,
				borderRadius: "50%",
				width: 15,
				height: 15,
			};
			return (
				<Grid xs={12} container direction="row">
					<Grid item xs={1}>
						<div style={circleStyle}></div>
					</Grid>
					<Grid item xs={6}>
						<div >{value.name}</div>
						{/* style={{ fontSize: '15px' }} */}
					</Grid>
					<Grid item xs={4}>
						<div><span style={{ fontWeight: "bold" }}>{value.y}</span> ({value.percent}%)</div>
					</Grid>
				</Grid>
			)
		})

	}

	render() {
		return (
			<Card style={{ color: '#bfbfbf', marginTop: '10px', display: 'flex' }}>
				<CanvasJSChart options={this.state.options}
					onRef={this.setWrapperRef}
					containerProps={{
						width: '200px', height: '250px', margin: '0px 10px 0px 30px'
					}}
				/>
				<div style={{ width: '350px', margin: '40px 10px 10px 10px' }}>
					{this.renderDetail()}
				</div>
			</Card>
		);
	}
}
DoughnutChart.propTypes = {
	// options: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
};
export default DoughnutChart;       