package com.hcmute.pose.employeeservice.model;


import com.hcmute.pose.common.model.audit.DateAudit;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class Employee extends DateAudit implements Serializable {
    private Long id;

    private String username;
    private String email;
    private String password;
    private Set<Role> roles = new HashSet<>();

    private String first_name;
    private String middle_name;
    private String last_name;

    public Employee() {
    }

//    public Employee(String username, String email, String password) {
//        super();
//        this.username = username;
//        this.email = email;
//        this.password = password;
//    }

    //Create employee
    public Employee(String username, String email, String password, Set<Role> roles, String firstName, String middleName, String lastName) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.first_name = firstName;
        this.middle_name = middleName;
        this.last_name = lastName;
    }

    public Employee(Long id, String username, String email, String password, String firstName, String middleName, String lastName) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = new HashSet<>();
        this.first_name = firstName;
        this.middle_name = middleName;
        this.last_name = lastName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getMiddle_name() {
        return middle_name;
    }

    public void setMiddle_name(String middle_name) {
        this.middle_name = middle_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }
}
