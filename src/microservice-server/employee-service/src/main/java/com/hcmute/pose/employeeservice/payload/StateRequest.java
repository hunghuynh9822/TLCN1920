package com.hcmute.pose.employeeservice.payload;

import com.hcmute.pose.employeeservice.model.UserStatus;

import java.util.List;

public class StateRequest {
    private Long id;
    private Integer status;
    private List<Long> roles;

    public StateRequest() {
    }

    public Long getId() {
        return id;
    }

    public UserStatus getStatus() {
        return UserStatus.values()[status];
    }

    public List<Long> getRoles() {
        return roles;
    }
}
