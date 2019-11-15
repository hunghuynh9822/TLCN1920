import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import Rating from '@material-ui/lab/Rating';
import AddTask from './AddTask'
const styles = theme => ({
    "checked": { "color": "orange" },
    "fa": { "fontSize": "10px" },
    "root": {
        "padding": "10px"
    }
});
class Task extends Component {
    constructor(props) {
        super(props);  
    }
    state = {
        expanded: false,
        list :[{"id":1, "title" : "task1" , "num" : 4 , "submit" : true },
        {"id":2,"title" : "task2" , "num" : 4 , "submit" : false },
        {"id":3,"title" : "task3" , "num" : 3 , "submit" : false },
        {"id":4,"title" : "task4" , "num" : 3 , "submit" : true}],
        listTask : [],
        listSubmit : [],
        points : 0, 
    }

    

    componentDidMount() {
        var lSubmited = []
        var lEmty = []
        var point = 0
        this.state.list.forEach(element => {
            if (element.submit === false ) {
                lSubmited.push(element);
                point = point + element.num; 
            }else{
                lEmty.push(element);
                point = point + element.num;
            }
        });
        
        this.setState({listTask : lSubmited})
        this.setState({listSubmit : lEmty})
        this.setState({points : point})

    }

    
    
    
    render() {
        const { classes } = this.props;
        
        const task = this.state.listTask.map(function(task){
            const handleChecked = (event) => {
                let key = event.target.name;
                let ischecked = event.target.checked
                var listTemp = this.state.list;
                for(var i=0 ; i < listTemp.length ;i++){
                    if( listTemp[i].id == key ){
                        listTemp[i].submit = ischecked;
                    }
                }
                this.setState({list : listTemp});
                var lSubmited = []
                var lEmty = []
                var point = 0
                this.state.list.forEach(element => {
                    if (element.submit === false ) {
                        lSubmited.push(element);
                        point = point + element.num; 
                    }else{
                        lEmty.push(element);
                        point = point + element.num;
                    }
                });
                
                this.setState({listTask : lSubmited})
                this.setState({listSubmit : lEmty})
                this.setState({points : point})
              }
        
            const handleRated = (event) => {
                let key = event.target.name;
                let value = event.target.value
                var listTemp = this.state.list;
                for(var i=0 ; i < listTemp.length ;i++){
                    if( listTemp[i].id == key ){
                        listTemp[i].num = parseInt(value);
                    }
                }
                this.setState({list : listTemp});
                var lSubmited = []
                var lEmty = []
                var point = 0
                this.state.list.forEach(element => {
                    if (element.submit === false ) {
                        lSubmited.push(element);
                        point = point + element.num; 
                    }else{
                        lEmty.push(element);
                        point = point + element.num;
                    }
                });
                
                this.setState({listTask : lSubmited})
                this.setState({listSubmit : lEmty})
                this.setState({points : point})
            }
            return (
                    <li className="list-group-item" >
                    <div className="row">
                        <div className="col-8">
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="check1">
                                    <input type="checkbox" className="form-check-input" id={task.id} name={task.id} defaultValue="something" checked={task.submit} onChange={ handleChecked } />{task.title}</label>
                            </div>
                        </div>  
                        <div className="col-4" style={{ float: 'right', fontSize:'10px' }}>
                            <Rating name={task.id} value={task.num}  style={{fontSize: '10px'}} onChange={ handleRated }/>
                        </div>
                    </div>
        </li>)},this);

        const tasked = this.state.listSubmit.map(function(task){
            const handleChecked = (event) => {
                let key = event.target.name;
                let ischecked = event.target.checked
                var listTemp = this.state.list;
                for(var i=0 ; i < listTemp.length ;i++){
                    if( listTemp[i].id == key ){
                        listTemp[i].submit = ischecked;
                    }
                }
                this.setState({list : listTemp});
                var lSubmited = []
                var lEmty = []
                var point = 0
                this.state.list.forEach(element => {
                    if (element.submit === false ) {
                        lSubmited.push(element);
                        point = point + element.num; 
                    }else{
                        lEmty.push(element);
                        point = point + element.num;
                    }
                });
                
                this.setState({listTask : lSubmited})
                this.setState({listSubmit : lEmty})
                this.setState({points : point})
              }
        
            const handleRated = (event) => {
                let key = event.target.name;
                let value = event.target.value
                var listTemp = this.state.list;
                for(var i=0 ; i < listTemp.length ;i++){
                    if( listTemp[i].id == key ){
                        listTemp[i].num = parseInt(value);
                    }
                }
                this.setState({list : listTemp});
                var lSubmited = []
                var lEmty = []
                var point = 0
                this.state.list.forEach(element => {
                    if (element.submit === false ) {
                        lSubmited.push(element);
                        point = point + element.num; 
                    }else{
                        lEmty.push(element);
                        point = point + element.num;
                    }
                });
                
                this.setState({listTask : lSubmited})
                this.setState({listSubmit : lEmty})
                this.setState({points : point})
            }
            return (
                    <li className="list-group-item" >
                    <div className="row">
                        <div className="col-8">
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="check1">
                                    <input type="checkbox" className="form-check-input" id={task.id} name={task.id} defaultValue="something" checked={task.submit} onChange={ handleChecked } />{task.title}</label>
                            </div>
                        </div>  
                        <div className="col-4" style={{ float: 'right', fontSize:'10px' }}>
                            <Rating name={task.id} value={task.num}  style={{fontSize: '10px'}} onChange={ handleRated }/>
                        </div>
                    </div>
        </li>)},this);


        return (
            <div className={classes.root}>
                <ul className="list-group">
                    <li className="list-group-item active">
                        <div className="row">
                            <div className="col-10"><a>{this.props.user.name}</a></div>                         
                            <div className="col-2"><AddTask  style={{ float: 'right' }} /></div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-8"><a>{this.state.listSubmit.length}/{this.state.listSubmit.length+this.state.listTask.length} Task With Point</a></div>
                            <div className="col-4"><a style={{ float: 'right' }}>{this.state.points} Point</a></div>
                        </div>
                    </li>

                    {task}

                    <li className="list-group-item "><div className="row" style={{ height: '6px' }}><a style={{ fontSize: '12px' }}>Completed Task</a></div></li>
                    {tasked}
                </ul>
            </div>
        );
    }
}
Task.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Task);