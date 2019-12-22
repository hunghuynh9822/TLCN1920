/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react' 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class BarChart extends Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
		this.state = {
            data : []
        } 
	}
	
	componentDidMount(){
        var data = [
			{
				type: "stackedColumn",
				name: "Done",
				showInLegend: true,
				yValueFormatString: "#,###k",
				dataPoints: [
					{ label: "Liem", y: 4 },
					{ label: "Hung", y: 5 },
					{ label: "A", y: 6 },
					{ label: "B", y: 2 },
				]
			},
			{
				type: "stackedColumn",
				name: "Doing",
				showInLegend: true,
				yValueFormatString: "#,###k",
				dataPoints: [
					{ label: "Liem", y: 10 },
					{ label: "Hung", y: 3 },
					{ label: "A", y: 5 },
					{ label: "B", y: 9 },
				]
			},
		]
        this.setState({data : data})
	}
	
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "People of Tasks",
				fontFamily: "verdana"
			},
			axisY: {
				title: "in Eur",
				prefix: "€",
				suffix: "k"
			},
			toolTip: {
				shared: true,
				reversed: true
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: this.state.data
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
} 
export default BarChart;       