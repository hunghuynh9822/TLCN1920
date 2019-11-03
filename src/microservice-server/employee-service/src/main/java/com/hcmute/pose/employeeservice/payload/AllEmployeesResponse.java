package com.hcmute.pose.employeeservice.payload;

import java.util.List;

public class AllEmployeesResponse {
    private List<EmployeeResponse> employees;

    public AllEmployeesResponse() {

    }

    public AllEmployeesResponse(List<EmployeeResponse> employees) {
        this.employees = employees;
    }

    public List<EmployeeResponse> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeResponse> employees) {
        this.employees = employees;
    }
}
