import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({ 
    "checked": { "color": "orange" }, 
    "fa": { "fontSize": "10px", "width": "5px" },
    "root":{
        "padding":"10px"
    }
});
class Task extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            expanded: false,
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ul className="list-group">
                    <li className="list-group-item active">
                        <div className="row">
                            <div className="col-10"><a>Thái Thanh Liêm</a></div>
                            <div className="col-2"><i className="fas fa-plus" style={{ float: 'right' }} /></div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-8"><a>1/3 Task With Point</a></div>
                            <div className="col-4"><a style={{ float: 'right' }}>5 Point</a></div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-8">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="check1">
                                        <input type="checkbox" className="form-check-input" id="check1" name="option1" defaultValue="something" />Task 1
          </label>
                                </div>
                            </div>
                            <div className="col-4" style={{ float: 'right' }}>
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-8">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="check1">
                                        <input type="checkbox" className="form-check-input" id="check1" name="option1" defaultValue="something" />Task 2
          </label>
                                </div>
                            </div>
                            <div className="col-4" style={{ float: 'right' }}>
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item "><div className="row" style={{ height: '6px' }}><a style={{ fontSize: '12px' }}>Completed Task</a></div></li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-8">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="check1">
                                        <input type="checkbox" className="form-check-input" id="check1" name="option1" defaultValue="something" defaultChecked />Task 3
          </label>
                                </div>
                            </div>
                            <div className="col-4" style={{ float: 'right' }}>
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
Task.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Task);