package com.hcmute.pose.projectservice.payload;

import com.google.gson.annotations.SerializedName;

public class EmployeeResponse {
    @SerializedName("id")
    private Long employeeId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String imageUrl;

    public EmployeeResponse() {
    }

    public EmployeeResponse(Long employeeId, String firstName, String middleName, String lastName, String email, String imageUrl) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.imageUrl = imageUrl;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
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
}
