import React from 'react';
import { Redirect } from 'react-router-dom';

export function redirect(props, roles) {
    console.log(roles);
    let index = roles[0];
    let maxRole = roles.filter((role) => role.id <= index.id);
    switch (maxRole[0].id) {
        case 1:
            return <Redirect to={{
                pathname: "/admin",
                state: { from: props.location }
            }} />;
        case 2:
            return <Redirect to={{
                pathname: "/staff",
                state: { from: props.location }
            }} />;
        case 3:
            return <Redirect to={{
                pathname: "/lead",
                state: { from: props.location }
            }} />;
        case 4:
            return <Redirect to={{
                pathname: "/hr",
                state: { from: props.location }
            }} />;
    }
}