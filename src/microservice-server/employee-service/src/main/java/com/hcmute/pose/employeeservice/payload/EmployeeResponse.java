package com.hcmute.pose.employeeservice.payload;

import com.hcmute.pose.common.security.AuthProvider;
import com.hcmute.pose.employeeservice.model.*;

import java.util.Date;
import java.util.Set;

public class EmployeeResponse {
    private Long id;
    private String email;
    private String phone;
    private Set<Role> roles;
    private String firstName;
    private String middleName;
    private String lastName;
    private ID identification;
    private String address;
    private Position position;
    private Bank bank;
    private Date birthday;
    private Date startTime;
    private EmployeeStatus status;
    private String oauth2Name;
    private String imageUrl;
    private Boolean emailVerified;
    private AuthProvider provider;
    private String providerId;
    private Long createdAt;
    private Long updatedAt;

    public EmployeeResponse(User user, Employee employee){
        this.id = user.getId();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.roles = user.getRoles();
        this.oauth2Name = user.getOauth2Name();
        this.imageUrl = user.getImageUrl();
        this.emailVerified = user.getEmailVerified();
        this.provider = user.getProvider();
        this.providerId = user.getProviderId();
        this.firstName = employee.getFirstName();
        this.middleName = employee.getMiddleName();
        this.lastName = employee.getLastName();
        this.identification = employee.getIdentification();
        this.address = employee.getAddress();
        this.position = employee.getPosition();
        this.bank = employee.getBank();
        this.birthday = new Date(employee.getBirthday());
        this.startTime = new Date(employee.getStartTime());
        this.status = employee.getStatus();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public ID getIdentification() {
        return identification;
    }

    public void setIdentification(ID identification) {
        this.identification = identification;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Bank getBank() {
        return bank;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public EmployeeStatus getStatus() {
        return status;
    }

    public void setStatus(EmployeeStatus status) {
        this.status = status;
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

    public Long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }

    public Long getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Long updatedAt) {
        this.updatedAt = updatedAt;
    }
}
