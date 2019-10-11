package com.hcmute.pose.employeeservice.payload;

import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.model.Role;
import com.hcmute.pose.employeeservice.model.User;

import java.util.Set;

public class EmployeeResponse {
    private Long id;
    private String email;
    private String phone;
    private Set<Role> roles;
    private String firstName;
    private String middleName;
    private String lastName;

    public EmployeeResponse(Long id, String email, String phone, Set<Role> roles, String firstName, String middleName, String lastName) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.roles = roles;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
    }

    public EmployeeResponse(User user, Employee employee){
        this.id = user.getId();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.roles = user.getRoles();
        this.firstName = employee.getFirst_name();
        this.middleName = employee.getMiddle_name();
        this.lastName = employee.getLast_name();
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
}
