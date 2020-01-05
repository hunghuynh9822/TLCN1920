import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../assets/jss/styles/views/requestStyle";
import { serverUrl } from '../../action/index';
import { connect } from 'react-redux';
import axios from 'axios';
import { MaterialTable, PaginationTable,AddRequest,CollapsibleSection } from "../../components"

const columns = [
    { id: 'no', label: 'No.', minWidth: 50 },
    { id: 'name', label: 'Name', minWidth: 200 },
    { id: 'position', label: 'Position', minWidth: 130 },
    { id: 'timestart', label: 'Time Start', minWidth: 100 },
    { id: 'timeend', label: 'Time End', minWidth: 100 },
    { id: 'reason', label: 'Reason', minWidth: 300 },
    { id: 'action', label: 'Action', minWidth: 150 ,align: 'center'},
];


class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows : [],
            confirms : [],
            requests : []
        }
        this.callActionDelete = this.callActionDelete.bind(this);
        this.callActionConfirm = this.callActionConfirm.bind(this);
        this.addReq = this.addReq.bind(this);
    }

    componentDidMount(){
        const {currentUser} = this.props;
        var isAdmin = 0;
        // var rows = [
        //     this.createData('1', 'Huỳnh Lê Hữu Hưng', "Nhân viên", "05/09/2019", "06/09/2019", "Việc gia đình",false),
        //     this.createData('2', 'Thái Thanh Liêm', "Nhân viên", "08/09/2019", "09/09/2019", "Việc gia đình",false),
        //     this.createData('3', 'Nguyen Truong Trang', "Nhân viên", "08/09/2019", "09/09/2019", "Di ban dat",false),
        // ]
        currentUser.roles.forEach(element => {
            if(element.id === 1)
                isAdmin = 1;
                // console.log("isAdmin: "+isAdmin +"name: "+ element.name);    
        });
        // kiem tra quyen admin
        if (isAdmin === 1){
        var url = serverUrl+"/api/requests/"
        axios.get(url)
        .then(response =>{
            const temp = response.data;
            var rows = []
            temp.forEach(element =>{
                var no = rows.length + 1 ;
                var datestart = new Date(element.timestart);
                datestart = datestart.getDate() +"/"+(datestart.getMonth() + 1) + "/" + datestart.getFullYear(); 
                var dateend = new Date(element.timeend);
                dateend = dateend.getDate() +"/"+(dateend.getMonth() + 1) + "/" + dateend.getFullYear();
                if (element.confirm === false ){
                    rows.push(this.createData(no , element.name , element.position , datestart , dateend , element.reason, element.confirm, element.id)) ;
                }else{
                    rows.push(this.createDataDelete(no , element.name , element.position , datestart , dateend , element.reason, element.confirm, element.id)) ;
                }
            })
            var lRequest = []
            var lConfirm = []
        rows.forEach(element => {
            if (element.confirm === false ) {
                lRequest.push(element);
                console.log(element);   
            }else{
                lConfirm.push(element);
            }
        });        
        this.setState({
            requests : lRequest,
            rows: rows,
            confirms : lConfirm,
        })
        })
        .catch(error => console.log("ok loi ne "+error))
        } else {
            var url = serverUrl+"/api/requests/"+ currentUser.id 
        axios.get(url)
        .then(response =>{
            const temp = response.data;
            var rows = []
            temp.forEach(element =>{
                var no = rows.length + 1 ;
                var datestart = new Date(element.timestart);
                datestart = datestart.getDate() +"/"+(datestart.getMonth() + 1) + "/" + datestart.getFullYear(); 
                var dateend = new Date(element.timeend);
                dateend = dateend.getDate() +"/"+(dateend.getMonth() + 1) + "/" + dateend.getFullYear();
                if (element.confirm === false ){
                    rows.push(this.createData(no , element.name , element.position , datestart , dateend , element.reason, element.confirm, element.id)) ;
                }else{
                    rows.push(this.createDataDelete(no , element.name , element.position , datestart , dateend , element.reason, element.confirm, element.id)) ;
                }          
            })
            var lRequest = []
            var lConfirm = []
        rows.forEach(element => {
            if (element.confirm === false ) {
                lRequest.push(element);
            }else{
                lConfirm.push(element);
            }
        });        
        this.setState({
            requests : lRequest,
            rows: rows,
            confirms : lConfirm,
        })
        })
        .catch(error => console.log("ok loi ne "+error))
        }
    }
    


    addReq(req) {
        var temp = this.state.requests;
        var id = 0;
        const {currentUser} = this.props;
        const name = currentUser.firstName +" "+ currentUser.middleName +" "+ currentUser.lastName;
        const no = this.state.requests.length + this.state.confirms.length + 1;
        const position = currentUser.position.name
        var timestart = req.t1.getTime();
        var timeend = req.t2.getTime();
        var url = serverUrl+"/api/requests/"
        axios.post(url, {employeeid:currentUser.id,name:name,position:position,timestart:timestart,timeend:timeend,reason:req.reason,confirm:false})
        .then(res => {
        // console.log(res);
        // console.log(res.data);
        id = res.data.id
        temp.push(this.createData(no , name , position , req.timestart , req.timeend , req.reason, req.confirm ,id)) ;
        this.setState({requests : temp });
        }).catch(err=>{ 
            console.log(err);
        })
        
    }

    // createData(no, name, position, timestart, timeend, reason, confirm , data) {
    //     const action = [{
    //         name: 'view',
    //         method: this.callActionView
    //     }, {
    //         name: 'confirm',
    //         method: this.callActionConfirm
    //     }];
    //     return { no, name, position, timestart, timeend, reason, confirm ,action ,data };
    // }
    createData(no, name, position, timestart, timeend, reason, confirm , data) {
        const action = [{
            name: 'confirm',
            method: this.callActionConfirm
        }];
        return { no, name, position, timestart, timeend, reason, confirm ,action ,data };
    }
    createDataDelete(no, name, position, timestart, timeend, reason, confirm , data) {
        const action = [{
            name: 'delete',
            method: this.callActionDelete
        }];
        return { no, name, position, timestart, timeend, reason, confirm ,action ,data  };
    }
    callActionConfirm(method, row) {
        const {currentUser} = this.props;
        var isAdmin = 0;
        currentUser.roles.forEach(element => {
            if(element.id === 1)
                isAdmin = 1;
                // console.log("isAdmin: "+isAdmin +"name: "+ element.name);    
        });
        if(isAdmin == 1){
            var rows = this.state.requests;  
            for(var i=0 ; i < rows.length ;i++){
                if( rows[i].no === row.no ){
                    rows[i].confirm = true;
                    //console.log(rows[i].data);
                    var url = serverUrl+"/api/requests/update/"+rows[i].data +"?confirm=true"
                    axios.put(url)
                    .then(res => {
                    console.log(res);
                    console.log(res.data);
                    //=================
                    var url = serverUrl+"/api/requests/"
                    axios.get(url)
                    .then(response =>{
                        const temp = response.data;
                        var rows = []
                        temp.forEach(element =>{
                            var no = rows.length + 1 ;
                            var datestart = new Date(element.timestart);
                            datestart = datestart.getDate() +"/"+(datestart.getMonth() + 1) + "/" + datestart.getFullYear(); 
                            var dateend = new Date(element.timeend);
                            dateend = dateend.getDate() +"/"+(dateend.getMonth() + 1) + "/" + dateend.getFullYear();
                            if (element.confirm === false ){
                                rows.push(this.createData(no , element.name , element.position , datestart , dateend , element.reason, element.confirm, element.id)) ;
                            }else{
                                rows.push(this.createDataDelete(no , element.name , element.position , datestart , dateend , element.reason, element.confirm, element.id)) ;
                            }
                        })
                        var lRequest = []
                        var lConfirm = []
                    rows.forEach(element => {
                        if (element.confirm === false ) {
                            lRequest.push(element);
                            console.log(element);   
                        }else{
                            lConfirm.push(element);
                        }
                    });        
                    this.setState({
                        requests : lRequest,
                        rows: rows,
                        confirms : lConfirm,
                    })
                    })
                    .catch(error => console.log("ok loi ne "+error))
                    //========================================
                    }).catch(err=>{ 
                        console.log(err);
                    }) 
                }
            }
            
        }
        //console.log("callActionConfirm" + JSON.stringify(row));    
    }

    callActionDelete(method, row) {
        const {currentUser} = this.props;
        var isAdmin = 0;
        currentUser.roles.forEach(element => {
            if(element.id === 1)
                isAdmin = 1;
                // console.log("isAdmin: "+isAdmin +"name: "+ element.name);    
        });
        if(isAdmin == 1){
            console.log("callActionView" + JSON.stringify(row));
            var rows = this.state.confirms;
            
            
            for(var i=0 ; i < rows.length ;i++){
                if( rows[i].no === row.no ){
                    //rows[i].confirm = true;
                    //console.log(rows[i].data);
                    var url = serverUrl+"/api/requests/delete/"+rows[i].data 
                    axios.put(url)
                    .then(res => {
                    console.log(res);
                    console.log(res.data);
                    }).catch(err=>{ 
                        console.log(err);
                    }) 
                }
            }
            var lConfirm = this.state.confirms;
            for(var i = lConfirm.length - 1; i >= 0; i--) {
                if(lConfirm[i].no === row.no) {
                lConfirm.splice(i, 1);
                }
            }
            this.setState({confirms : lConfirm})
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div>
                    <AddRequest  addReq={this.addReq}/>
                </div>
                <CollapsibleSection title="Request">
                    <PaginationTable columns={columns} rows={this.state.requests} />
                </CollapsibleSection>
                <CollapsibleSection title="Confirmed">
                    <PaginationTable columns={columns} rows={this.state.confirms} />
                </CollapsibleSection>
                
            </div>
        );
    }
}
Request.propTypes = {
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
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Request));