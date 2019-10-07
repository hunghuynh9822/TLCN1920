package com.hcmute.pose.employeeservice.payload;

import com.hcmute.pose.employeeservice.model.Employee;

import java.util.List;

public class AllEmployeesResponse {
    private List<Employee> employees;

    public AllEmployeesResponse() {

    }

    public AllEmployeesResponse(List<Employee> employees) {
        this.employees = employees;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }
}
