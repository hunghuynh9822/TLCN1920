/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react' 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class App extends Component {
	render() {
		const options = {
			title: {
				text: "Tasklists Overview"
			},
			toolTip: {
				shared: true
			},
			legend: {
				verticalAlign: "top"
			},
			axisY: {
				suffix: "%"
			},
			data: [{
				type: "stackedBar100",
				color: "#9bbb59",
				name: "Done",
				showInLegend: true,
				indexLabel: "{y}",
				indexLabelFontColor: "white",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ label: "Hung",   y: 85 },
					{ label: "Liem",   y: 79 },
					{ label: "Dieu",   y: 77 },
					{ label: "Tan",   y: 68 },
				]
			},{
				type: "stackedBar100",
				color: "#7f7f7f",
				name: "Doing",
				showInLegend: true,
				indexLabel: "{y}",
				indexLabelFontColor: "white",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ label: "Hung",   y: 15 },
					{ label: "Liem",   y: 21 },
					{ label: "Dieu",   y: 23 },
					{ label: "Liem",   y: 32 },
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default App;   