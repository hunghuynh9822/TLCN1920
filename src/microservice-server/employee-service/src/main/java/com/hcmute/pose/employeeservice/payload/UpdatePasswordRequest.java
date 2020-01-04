package com.hcmute.pose.employeeservice.payload;

public class UpdatePasswordRequest {
    private Long id;
    private String password;

    public UpdatePasswordRequest() {
    }

    public Long getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }
}
