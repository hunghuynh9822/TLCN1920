package com.hcmute.pose.projectservice.payload;

import com.hcmute.pose.projectservice.model.ProjectRole;

public class EmployeeResponse {
    private Long id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String imageUrl;
    private ProjectRole role;

    public EmployeeResponse() {
    }

    public EmployeeResponse(Long id, String firstName, String middleName, String lastName, String email, String imageUrl) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.imageUrl = imageUrl;
    }

    public EmployeeResponse(Long id, String firstName, String middleName, String lastName, String email, String imageUrl, ProjectRole role) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.imageUrl = imageUrl;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ProjectRole getRole() {
        return role;
    }

    public void setRole(ProjectRole role) {
        this.role = role;
    }
}
