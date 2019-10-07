package com.hcmute.pose.employeeservice.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

public class EmployeeRequest {
    @NotBlank(message = "Username not allow blank")
    @Size(max = 255,message = "Username too long")
    private String username;

    @NotBlank(message = "Email not allow blank")
    @Email(message = "Email with wrong format")
    private String email;

    @NotBlank(message = "Password not allow blank")
    @Size(min = 8,max = 255,message = "Password must be between 8 - 255 ")
    private String password;

    @NotEmpty(message = "Not set role yet")
    private List<Long> roles = new ArrayList<>();

    @NotBlank(message = "First name not allow blank")
    @Size(max = 255,message = "First name too long")
    private String firstName;

    @NotBlank(message = "Middle name not allow blank")
    @Size(max = 255,message = "Middle name too long")
    private String middleName;

    @NotBlank(message = "Last name not allow blank")
    @Size(max = 255,message = "Last name too long")
    private String lastName;

    public EmployeeRequest() {
    }

    //For test

    public EmployeeRequest(@NotBlank(message = "Username not allow blank") @Size(max = 255, message = "Username too long") String username, @NotBlank(message = "Email not allow blank") @Email(message = "Email with wrong format") String email, @NotBlank(message = "Password not allow blank") @Size(min = 8, max = 255, message = "Password must be between 8 - 255 ") String password, @NotEmpty(message = "Not set role yet") List<Long> roles, @NotBlank(message = "First name not allow blank") @Size(max = 255, message = "First name too long") String firstName, @NotBlank(message = "Middle name not allow blank") @Size(max = 255, message = "Middle name too long") String middleName, @NotBlank(message = "Last name not allow blank") @Size(max = 255, message = "Last name too long") String lastName) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
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

    public List<Long> getRoles() {
        return roles;
    }

    public void setRoles(List<Long> roles) {
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
}
