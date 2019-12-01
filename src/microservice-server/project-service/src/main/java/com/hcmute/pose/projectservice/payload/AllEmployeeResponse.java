package com.hcmute.pose.projectservice.payload;

import java.util.List;

public class AllEmployeeResponse {
    private List<EmployeeResponse> employees;

    public AllEmployeeResponse(List<EmployeeResponse> employees) {
        this.employees = employees;
    }

    public AllEmployeeResponse() {
    }

    public List<EmployeeResponse> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeResponse> employees) {
        this.employees = employees;
    }
}
