package com.hcmute.pose.authservice.model;

import java.io.Serializable;
import java.util.Set;

public class UserModel implements Serializable {
    private Long id;
    private String email;
    private String phone;
    private String password;
    private Set<Role> roles;

    public UserModel() {

    }

    public UserModel(Long id, String email, String phone, String password, Set<Role> roles) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getPassword() {
        return password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
