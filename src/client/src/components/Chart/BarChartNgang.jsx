/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			options: {
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
				data: []
			}
		}
		this.loadData = this.loadData.bind(this);
	}

	renderData(name, dataPoints) {
		return {
			type: "stackedBar100",
			name: name,
			showInLegend: true,
			indexLabel: "{number}",
			indexLabelFontColor: "white",
			yValueFormatString: "#,###'%'",
			dataPoints: dataPoints
		}
	}

	loadData() {
		let dataInput = this.props.dataInput;
		console.log("BAR CHART LOAD DATA " + JSON.stringify(this.props.dataInput))
		let result = dataInput.map((input) => {
			return this.renderData(input.name, input.data)
		});
		this.setState({
			data: result,
			options: { ...this.state.options, data: result }
		})
	}

	componentDidMount() {
		this.loadData();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.index == 3) {
			this.loadData();
		}
	}

	render() {
		// console.log("BAR CHART DATA " + JSON.stringify(this.state.data))
		return (
			<div>
				<CanvasJSChart options={this.state.options}
					onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}
export default App;   