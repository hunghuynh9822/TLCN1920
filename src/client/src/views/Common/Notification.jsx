import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../assets/jss/styles/views/notificationStyle";
import { MaterialTable, PaginationTable, Notifi } from "../../components"
import { connect } from 'react-redux';
import axios from 'axios';
const columns = [
    { id: 'no', label: 'No.', minWidth: 50 },
    { id: 'title', label: 'Title', minWidth: 200 },
    { id: 'name', label: 'Sender', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 },
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
        var url = "http://192.168.200.1:8080/api/notify/" + currentUser.id
        axios.get(url)
        .then(response =>{
            const temp = response.data;
            var rows = []
            temp.forEach(element =>{
                var no = rows.length + 1 ;
                rows.push(this.createData(no , element.content ,element.create_name, element.id)) ;
            })
    
        this.setState({
            rows: rows,
            isAdmin :isAdmin
        })
        })
        .catch(error => console.log("ok loi ne notify lisst"+error))


        var url = "http://192.168.200.1:8080/api/employees/"
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
        const no = this.state.rows.length + this.state.rows.length + 1;
        listsID.forEach(element => {
            axios.post(`http://192.168.200.1:8080/api/notify/`, {create_id:currentUser.id,create_name:name,create_time:time,content:req.content,receive_id:element.id})
            .then(res => {
            // console.log(res);
            console.log(res.data);

            id = res.data.id
            if (currentUser.id === id){
                temp.push(this.createData(no , req.content ,req.create_name , id)) ;
                this.setState({ rows : temp });
            }
            
            }).catch(err=>{ 
                console.log(err);
            })
        });
        
    }


    createData(no, title, name ,data) {
        const action = [{
            name: 'view',
            method: this.callActionView
        }, {
            name: 'delete',
            method: this.callActionDelete
        }];
        return { no, title , name , action ,data };
    }

    callActionDelete(method, row) {
        console.log("callActionDelete" + JSON.stringify(row));
        axios.put(`http://192.168.200.1:8080/api/notify/delete/`+ row.data )
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
        axios.put(`http://192.168.200.1:8080/api/notify/update/`+ row.data +'?view=true')
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