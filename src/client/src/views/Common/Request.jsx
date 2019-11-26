import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from "../../assets/jss/styles/views/requestStyle";

import { connect } from 'react-redux';

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
        this.callActionView = this.callActionView.bind(this);
        this.callActionConfirm = this.callActionConfirm.bind(this);
        this.addReq = this.addReq.bind(this);
    }

    componentDidMount(){
        var rows = [
            this.createData('1', 'Huỳnh Lê Hữu Hưng', "Nhân viên", "05/09/2019", "06/09/2019", "Việc gia đình",false),
            this.createData('2', 'Thái Thanh Liêm', "Nhân viên", "08/09/2019", "09/09/2019", "Việc gia đình",false),
            this.createData('3', 'Nguyen Truong Trang', "Nhân viên", "08/09/2019", "09/09/2019", "Di ban dat",false),
        ]
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
    }
    


    addReq(req) {
        var temp = this.state.requests;

        const {currentUser} = this.props;
        const name = currentUser.firstName +" "+ currentUser.middleName +" "+ currentUser.lastName;
        const no = this.state.requests.length + this.state.confirms.length + 1;
        temp.push(this.createData(no , name , req.position , req.timestart , req.timeend , req.reason, req.confirm)) ;
        //console.log("AddReq" + JSON.stringify(req));
        this.setState({requests : temp });
    }

    
    createData(no, name, position, timestart, timeend, reason, confirm , data) {
        const action = [{
            name: 'view',
            method: this.callActionView
        }, {
            name: 'confirm',
            method: this.callActionConfirm
        }];
        return { no, name, position, timestart, timeend, reason, confirm ,action ,data };
    }

    callActionConfirm(method, row) {
        console.log("callActionConfirm" + JSON.stringify(row));

        var rows = this.state.requests;

        for(var i=0 ; i < rows.length ;i++){
            if( rows[i].no === row.no ){
                rows[i].confirm = true;
            }
        }
        
        var lRequest = []
        var lConfirm = this.state.confirms;
        rows.forEach(element => {
            console.log("element : " + JSON.stringify(element));
            if (element.confirm === false ) {
                lRequest.push(element);
            }else{
                lConfirm.push(element);
            }
        });        
        this.setState({requests : lRequest , confirms : lConfirm})
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