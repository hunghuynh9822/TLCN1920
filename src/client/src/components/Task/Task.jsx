import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import Rating from '@material-ui/lab/Rating';
import AddTask from './AddTask'
import axios from 'axios';
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
        list :[],
        listTask : [],
        listSubmit : [],
        points : 0, 
    }

    componentDidMount() {
        //var url = "http://192.168.200.1:8080/taskmicro/listTask?employeeId="+this.props.user.id+"&projectId="+ this.props.user.proID
        var url = "http://192.168.0.104:8080/taskmicro/listTask?employeeId="+this.props.user.id+"&projectId="+ this.props.user.proID
        
        axios.get(url)
        .then(response =>{
            const listTask = response.data;
            this.setState({list : listTask});
            var lSubmited = []
            var lEmty = []
            var point = 0
            this.state.list.forEach(element => {
                if (element.status === false ) {
                    lSubmited.push(element);
                    point = point + element.point; 
                }else{
                    lEmty.push(element);
                    point = point + element.point;
                }
            });
            
            this.setState({listTask : lSubmited})
            this.setState({listSubmit : lEmty})
            this.setState({points : point})
        })
        .catch(error => console.log("ok loi ne "+error))
    }

    render() {
        const { classes } = this.props;
        
        const task = this.state.listTask.map(function(task){
            const handleChecked = (event) => {
                let key = event.target.name;
                let ischecked = event.target.checked;
                console.log("Day la gia tri check: "+ischecked)
                var listTemp = this.state.list;
                for(var i=0 ; i < listTemp.length ;i++){
                    if( listTemp[i].id == key ){
                        listTemp[i].status = ischecked;
                    }
                }
                this.setState({list : listTemp});
                var lSubmited = []
                var lEmty = []
                var point = 0
                this.state.list.forEach(element => {
                    if (element.status === false ) {
                        lSubmited.push(element);
                        point = point + element.point; 
                    }else{
                        lEmty.push(element);
                        point = point + element.point;
                    }
                }); 
                this.setState({listTask : lSubmited})
                this.setState({listSubmit : lEmty})
                this.setState({points : point})
                var url = "http://192.168.200.1:8080/taskmicro/updateStatus/"+parseInt(key)+"?status="+ ischecked
                axios.put(url)
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    }).catch(err=>{ 
                        console.log(err);
                    })
              }
        
            const handleRated = (event) => {
                let key = event.target.name;
                let value = event.target.value
                var listTemp = this.state.list;
                for(var i=0 ; i < listTemp.length ;i++){
                    if( listTemp[i].id == key ){
                        listTemp[i].point = parseInt(value);
                    }
                }
                this.setState({list : listTemp});
                var lSubmited = []
                var lEmty = []
                var point = 0
                this.state.list.forEach(element => {
                    if (element.status === false ) {
                        lSubmited.push(element);
                        point = point + element.point; 
                    }else{
                        lEmty.push(element);
                        point = point + element.point;
                    }
                });
                this.setState({listTask : lSubmited})
                this.setState({listSubmit : lEmty})
                this.setState({points : point})
                var url = "http://192.168.200.1:8080/taskmicro/updatePoint/"+parseInt(key)+"?point="+ parseInt(value)
                axios.put(url)
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    }).catch(err=>{ 
                        console.log(err);
                    })
            }
            return (
                    <li className="list-group-item" >
                    <div className="row">
                        <div className="col-8">
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="check1">
                                    <input type="checkbox" className="form-check-input" id={task.id} name={task.id} defaultValue="something" checked={task.status} onChange={ handleChecked } />{task.title}</label>
                            </div>
                        </div>  
                        <div className="col-4" style={{ float: 'right', fontSize:'10px' }}>
                            <Rating name={task.id} value={task.point}  style={{fontSize: '10px'}} onChange={ handleRated }/>
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
                        listTemp[i].status = ischecked;
                    }
                }
                this.setState({list : listTemp});
                var lSubmited = []
                var lEmty = []
                var point = 0
                this.state.list.forEach(element => {
                    if (element.status === false ) {
                        lSubmited.push(element);
                        point = point + element.point; 
                    }else{
                        lEmty.push(element);
                        point = point + element.point;
                    }
                });
                
                this.setState({listTask : lSubmited})
                this.setState({listSubmit : lEmty})
                this.setState({points : point})
                var url = "http://192.168.200.1:8080/taskmicro/updateStatus/"+parseInt(key)+"?status="+ ischecked
                axios.put(url)
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    }).catch(err=>{ 
                        console.log(err);
                    })
              }
        
            const handleRated = (event) => {
                let key = event.target.name;
                let value = event.target.value
                var listTemp = this.state.list;
                for(var i=0 ; i < listTemp.length ;i++){
                    if( listTemp[i].id == key ){
                        listTemp[i].point = parseInt(value);
                    }
                }
                this.setState({list : listTemp});
                var lSubmited = []
                var lEmty = []
                var point = 0
                this.state.list.forEach(element => {
                    if (element.status === false ) {
                        lSubmited.push(element);
                        point = point + element.point; 
                    }else{
                        lEmty.push(element);
                        point = point + element.point;
                    }
                });
                
                this.setState({listTask : lSubmited})
                this.setState({listSubmit : lEmty})
                this.setState({points : point})
                var url = "http://192.168.200.1:8080/taskmicro/updatePoint/"+parseInt(key)+"?point="+ parseInt(value)
                axios.put(url)
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    }).catch(err=>{ 
                        console.log(err);
                    })
            }
            return (
                    <li className="list-group-item" >
                    <div className="row">
                        <div className="col-8">
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="check1">
                                    <input type="checkbox" className="form-check-input" id={task.id} name={task.id} defaultValue="something" checked={task.status} onChange={ handleChecked } />{task.title}</label>
                            </div>
                        </div>  
                        <div className="col-4" style={{ float: 'right', fontSize:'10px' }}>
                            <Rating name={task.id} value={task.point}  style={{fontSize: '10px'}} onChange={ handleRated }/>
                        </div>
                    </div>
        </li>)},this);


        return (
            <div className={classes.root}>
                <ul className="list-group">
                    <li className="list-group-item active">
                        <div className="row">
                            <div className="col-10"><a>{this.props.user.name}</a></div>                         
                            <div className="col-2"><AddTask  style={{ float: 'right' }} user={this.props.user} /></div>
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