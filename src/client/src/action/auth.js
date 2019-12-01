import axios from 'axios';

import {
  ACCESS_TOKEN
} from '../constants'

import {
  request
} from './'

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_USER = 'UPDATE_USER'
export const LOGIN_ROLE = 'LOGIN_ROLE'

export function authenticate(authenticated, currentUser) {
  return {
    type: LOG_IN,
    authenticated,
    currentUser
  };
}

export function loginRole(role) {
  return {
    type: LOGIN_ROLE,
    role
  };
}

export function logout() {
  let authenticated = false;
  let currentUser = null;
  return {
    type: LOG_OUT,
    authenticated,
    currentUser
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user
  }
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  return request({
    url: "/auth/current",
    method: 'GET'
  });
}

export function login(loginRequest) {
  return request({
    url: "/auth/login",
    method: 'POST',
    data: JSON.stringify(loginRequest)
  });
}

export function loginAsAdmin(loginRole) {
  if(loginRole !== null) {
    return loginRole === 'ROLE_ADMIN';
  }
  return false;
}

export function loginAsLead(loginRole) {
  if(loginRole !== null) {
    return loginRole === 'ROLE_LEAD';
  }
  return false;
}

export function loginAsHr(loginRole) {
  if(loginRole !== null) {
    return loginRole === 'ROLE_HR';
  }
  return false;
}

export function loginAsStaff(loginRole) {
  if(loginRole !== null) {
    return loginRole === 'ROLE_STAFF';
  }
  return false;
}

export function hasRoleAdmin(currentRole) {
  console.log("Current user role : " + JSON.stringify(currentRole));
  return currentRole.includes('ROLE_ADMIN');
}

export function hasRoleLead(currentRole) {
  console.log("Current user role : " + JSON.stringify(currentRole));
  return currentRole.includes('ROLE_LEAD');
}

export function hasRoleHr(currentRole) {
  console.log("Current user role : " + JSON.stringify(currentRole));
  return currentRole.includes('ROLE_HR');
}

export function hasRoleStaff(currentRole) {
  console.log("Current user role : " + JSON.stringify(currentRole));
  return currentRole.includes('ROLE_STAFF');
}