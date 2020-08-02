/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react'
import Card from '@material-ui/core/Card';
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
				text: "Project Overview",
				fontSize: 30,
				fontWeight: "normal",
				fontFamily: "Roboto, Helvetica, Arial, sans-serif",
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
				indexLabel: "{name}: {number} task",
				yValueFormatString: "#,###'%'",
				dataPoints: this.props.data

			}]
		}
		return (
			<Card style={{ color: '#bfbfbf', marginTop: '10px', display: 'flex' }}>
				<CanvasJSChart options={options}
					onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</Card>
		);
	}
}
export default PieChart;       