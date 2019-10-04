import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

const styles = theme => ({

});

class CustomLineChart extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        const { title, data } = this.props;
        console.log(data);
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    {title}
                </Typography>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{
                            top: 16,
                            right: 16,
                            bottom: 0,
                            left: 24,
                        }}
                    >
                        <XAxis dataKey="time" />
                        <YAxis>
                            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
                                Sales ($)
                        </Label>
                        </YAxis>
                        <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </React.Fragment>
        );
    }
}
CustomLineChart.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};
export default withStyles(styles)(CustomLineChart);