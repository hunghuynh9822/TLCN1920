package com.hcmute.pose.employeeservice.model;

import com.hcmute.pose.common.model.audit.DateAudit;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class User extends DateAudit implements Serializable {
    private Long id;
    private String email;
    private String phone;
    private String password;
    private Set<Role> roles ;

    public User(Long id, String email, String phone, String password) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.roles = new HashSet<>();
    }

    public User() {
        this.roles = new HashSet<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
