package com.hcmute.pose.employeeservice.payload;

import com.hcmute.pose.employeeservice.model.Role;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private String first_name;

    @NotBlank(message = "Middle name not allow blank")
    @Size(max = 255,message = "Middle name too long")
    private String middle_name;

    @NotBlank(message = "Last name not allow blank")
    @Size(max = 255,message = "Last name too long")
    private String last_name;

    public EmployeeRequest() {
    }

    //For test
    public EmployeeRequest(@NotBlank(message = "Username not allow blank") @Size(max = 255, message = "Username too long") String username, @NotBlank(message = "Email not allow blank") @Email(message = "Email with wrong format") String email, @NotBlank(message = "Password not allow blank") @Size(min = 8, max = 255, message = "Password must be between 8 - 255 ") String password, @NotEmpty(message = "Not set role yet") List<Long> roles, @NotBlank(message = "First name not allow blank") @Size(max = 255, message = "First name too long") String first_name, @NotBlank(message = "Middle name not allow blank") @Size(max = 255, message = "Middle name too long") String middle_name, @NotBlank(message = "Last name not allow blank") @Size(max = 255, message = "Last name too long") String last_name) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.first_name = first_name;
        this.middle_name = middle_name;
        this.last_name = last_name;
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
