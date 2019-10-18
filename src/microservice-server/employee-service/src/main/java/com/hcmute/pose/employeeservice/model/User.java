package com.hcmute.pose.employeeservice.model;

import com.google.gson.annotations.SerializedName;
import com.hcmute.pose.common.model.audit.DateAudit;
import com.hcmute.pose.common.security.AuthProvider;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class User extends DateAudit implements Serializable {
    private Long id;
    private String email;
    private String phone;
    private String password;
    private Set<Role> roles ;
    @SerializedName("oauth2_name")
    private String oauth2Name;
    @SerializedName("image_url")
    private String imageUrl;
    @SerializedName("email_verified")
    private Boolean emailVerified = false;
    private AuthProvider provider;
    @SerializedName("provider_id")
    private String providerId;

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

    public String getOauth2Name() {
        return oauth2Name;
    }

    public void setOauth2Name(String oauth2Name) {
        this.oauth2Name = oauth2Name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }
}
