package com.hcmute.pose.employeeservice.payload;

import com.hcmute.pose.employeeservice.model.Role;

import java.util.List;

public class AllRolesResponse {
    private List<Role> roles;

    public AllRolesResponse(List<Role> roles) {
        this.roles = roles;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
