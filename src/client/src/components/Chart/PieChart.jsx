/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class PieChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		// var data = [
		// 	{ name: "Done 5", y: 25 },
		// 	{ name: "Doing 15", y: 75 },
		// ]
		// this.setState({ data: data })
	}

	render() {
		const options = {
			animationEnabled: true,
			title: {
				text: "Project Overview"
			},
			subtitles: [{
				//text: "71% Positive",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {number}",
				yValueFormatString: "#,###'%'",
				dataPoints: this.props.data

			}]
		}
		return (
			<div>
				<CanvasJSChart options={options}
					onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}
export default PieChart;       