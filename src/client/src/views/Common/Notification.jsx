import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../assets/jss/styles/views/notificationStyle";
import { MaterialTable, PaginationTable, Notifi } from "../../components"
import { connect } from 'react-redux';
import axios from 'axios';

import { serverUrl } from '../../action/index';

const columns = [
    { id: 'no', label: 'No.', minWidth: 30 },
    { id: 'title', label: 'Title', minWidth: 200 },
    { id: 'name', label: 'Sender', minWidth: 100 },
    { id: 'date', label: 'Time', minWidth: 150 },
    { id: 'action', label: 'Action', minWidth: 70 },
];

// function createData(no, title) {
//     const action = ["view","delete"];
//     return { no, title, action };
// }

// const rows = [
//     createData('01', 'Thông báo nghỉ 2/9'),
//     createData('02', 'Thông báo họp ngày 3/9'),
// ];


class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows : [],
            list : [],
            isAdmin : 0
        }
        this.callActionView = this.callActionView.bind(this);
        this.callActionDelete = this.callActionDelete.bind(this);
        this.addNot = this.addNot.bind(this);
    }
    componentDidMount(){
        const {currentUser} = this.props;
        var isAdmin = 0;
        currentUser.roles.forEach(element => {
            if(element.id === 1)
                isAdmin = 1;
                // console.log("isAdmin: "+isAdmin +"name: "+ element.name);    
        });
        var url = serverUrl + "/api/notify/" + currentUser.id
        axios.get(url)
        .then(response =>{
            const temp = response.data;
            console.log(response.data);
            
            var rows = []
            temp.forEach(element =>{
                var no = rows.length + 1 ;
                var a = new Date(element.create_time);
                var year = a.getFullYear();
                var month = a.getMonth() + 1;
                var date = a.getDate();
                var hour = a.getHours();
                var muti = a.getMinutes();
                var time = hour+":"+muti+" - "+ date +"/"+month+"/"+year
                rows.push(this.createData(no , element.content ,element.create_name, time, element.id)) ;
            })
            
        this.setState({
            rows: rows,
            isAdmin :isAdmin
        })
        })
        .catch(error => console.log("ok loi ne notify lisst"+error))


        var url =  serverUrl +"/api/employees/"
        axios.get(url)
        .then(response =>{
            const temp = response.data.employees;
            this.setState({ list : temp })
            console.log(temp);
            
        })
        .catch(error => console.log("ok loi ne "+error))
    }

    addNot(req) { 
        var temp = this.state.rows;
        var listsID = this.state.list
        const {currentUser} = this.props;
        const name = currentUser.firstName +" "+ currentUser.middleName +" "+ currentUser.lastName;
        var date = new Date();
        var time = date.getTime();
        const no = this.state.rows.length + 1;
        var url = serverUrl + "/api/notify/"
        listsID.forEach(element => {
            axios.post(url, {create_id:currentUser.id,create_name:name,create_time:time,content:req.content,receive_id:element.id})
            .then(res => {
            // console.log(res);
            console.log(res.data);
            var a = new Date(res.data.create_time * 1000);
            var year = a.getFullYear();
            var month = a.getMonth() + 1;
            var date = a.getDate();
            var hour = a.getHours();
            var muti = a.getMinutes();
            var time = hour+":"+muti+" - "+ date +"/"+month+"/"+year
            var id = res.data.receive_id
            if (currentUser.id === id){
                temp.push(this.createData(no , res.data.content ,res.data.create_name, time , id)) ;
                this.setState({ rows : temp });
            }
            
            }).catch(err=>{ 
                console.log(err);
            })
        });
        
    }


    createData(no, title, name,date ,data) {
        const action = [{
            name: 'view',
            method: this.callActionView
        }, {
            name: 'delete',
            method: this.callActionDelete
        }];
        return { no, title , name ,date , action ,data };
    }

    callActionDelete(method, row) {
        console.log("callActionDelete" + JSON.stringify(row));
        var url =  serverUrl +"/api/notify/delete/" + row.data;
        axios.put(url)
            .then(res => {
            console.log(res.data);
            var rows = this.state.rows;
            for(var i = rows.length - 1; i >= 0; i--) {
                if(rows[i].id === row.data) {
                   rows.splice(i, 1);
                }
            }
            this.setState({
                rows: rows
            })
            }).catch(err=>{ 
                console.log(err);
            })
    }

    callActionView(method, row) {
        // let roles = row.data.roles.map((value) => {
        //     return value.name;
        // })
        // this.setState({
        //     request: { ...this.state.request, method: method, curEmployee: row.data, roles: roles },
        //     steps: ['Information', 'Setup Account'],
        // })
        // this.handleOpen();
        console.log("callActionView" + JSON.stringify(row));
        var url = serverUrl + "/api/notify/update/" + row.data +"?view=true"
        axios.put(url)
            .then(res => {
            // console.log(res);
            console.log(res.data);
            }).catch(err=>{ 
                console.log(err);
            })
    }


    render() {
        const { classes } = this.props;
        var AddNotify;
        if (this.state.isAdmin === 1) {
            AddNotify = <Notifi addNot={this.addNot}/>;
        }
        return (
            <div className={classes.root}>
                <div>
                    {/* <Notifi addNot={this.addNot}/> */}
                    {AddNotify}
                </div>
                <PaginationTable columns={columns} rows={this.state.rows} />
            </div>
        );
    }
}

Notification.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.auth.currentUser,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Notification));