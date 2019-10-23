import React from 'react';
import { Redirect } from 'react-router-dom';
import {ROUTER_MAP} from '../constants'

export function redirect(props, roles) {
    console.log(roles);
    let maxRole = roles[0];
    var i
    for (i = 0; i< roles.length; i++){
        if(maxRole.id > roles[i].id){
            maxRole = roles[i];
        }
    }
    let path = ROUTER_MAP[maxRole.name];
    console.log(path);
    if(path){
        return <Redirect to={{
            pathname: path,
            state: { from: props.location }
        }} />;
    }
}