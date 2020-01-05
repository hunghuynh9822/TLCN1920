import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react' ;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import $ from 'jquery' ;
var totalVisitors = 829500;
 
var visitorsDrilldownedChartOptions = {
	animationEnabled: true,
	theme: "light2",
	axisY: {
		gridThickness: 0,
		includeZero: false,
		lineThickness: 1
	},
	data: []
};
 
var newVSReturningVisitorsOptions = {
	animationEnabled: true,
	theme: "light2",
	title: {
		text: "New vs Returning Visitors"
	},
	subtitles: [{
		text: "Click on Any Segment to Drilldown",
		backgroundColor: "#2eacd1",
		fontSize: 16,
		fontColor: "white",
		padding: 5
	}],
	legend: {
		fontFamily: "calibri",
		fontSize: 14,
		itemTextFormatter: function (e) {
			return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / totalVisitors * 100) + "%";  
		}
	},
	data: []
};
 
class PieBarChart extends Component {
	constructor() {
		super();
		this.options = {};
		this.visitorsChartDrilldownHandler = this.visitorsChartDrilldownHandler.bind(this);
		this.state = {
			dataPie : [],
			dataDone : [],
			dataDoing: []
        }
	}
	componentDidMount(){
		var dataPie = [
			{ y: 25, name: "Done", color: "#E7823A" },
			{ y: 75, name: "Doing", color: "#546BC1" }
		]

		var dataDone = [
			{ x: Liem, y: 37000 },
			{ x: Hung, y: 39960 },
			{ x: Dieu, y: 41160 },
			{ x: Taan, y: 42240 },
		]

		var dataDoing = [
			{ x: Liem, y: 37000 },
			{ x: Hung, y: 39960 },
			{ x: Dieu, y: 41160 },
			{ x: Taan, y: 42240 },
		]
		this.setState ({
			dataPie : dataPie,
			dataDone : dataDone,
			dataDoing : dataDoing
		})

	}
	visitorsChartDrilldownHandler(e) {
		var chart = this.chart;
		chart.options = visitorsDrilldownedChartOptions;
		chart.options.data = this.options[e.dataPoint.name];
		chart.options.title = { text: e.dataPoint.name }
		chart.render();
		$("#backButton").toggleClass("invisible");
	}
	
	render() {	
		this.options = {
			"Tasks": [{
				click: this.visitorsChartDrilldownHandler,
				cursor: "pointer",
				explodeOnClick: false,
				innerRadius: "75%",
				legendMarkerType: "square",
				name: "Tasks",
				radius: "100%",
				showInLegend: true,
				startAngle: 90,
				type: "doughnut",
				dataPoints: this.state.dataPie
			}],
			"Done": [{
				color: "#E7823A",
				name: "Done",
				type: "column",
				dataPoints: this.state.dataDone
			}],
			"Doing": [{
				color: "#546BC1",
				name: "Doing",
				type: "column",
				dataPoints:this.state.dataDoing
			}]
		}
		const buttonStyle={
			bordeRadius: '4px',
			padding: '8px',
			border: 'none',
			fontSize: '16px',
			backgroundColor: '#2eacd1',
			color: 'white',
			position: 'absolute',
			top: '10px',
			right: '10px',
			cursor: 'pointer'
		}
		return (
		<div>
			<CanvasJSChart options = {this.options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			<button className="btn invisible" id="backButton" style={buttonStyle}>&lt; Back</button>
		</div>
		);
	}
	
	componentDidMount(){
		var chart = this.chart;
		var options = this.options
			chart.options = newVSReturningVisitorsOptions;
			chart.options.data = options["Tasks"];
			chart.render();
		
		$("#backButton").click(function() { 
			$(this).toggleClass("invisible");
			chart.options = newVSReturningVisitorsOptions;
			chart.options.data = options["Tasks"];
			chart.render();
		});
	}
}
     
export default PieBarChart;