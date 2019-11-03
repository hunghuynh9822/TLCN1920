package com.hcmute.pose.employeeservice.payload;

import java.util.List;

public class AdminAllEmployeesResponse {
    private List<EmployeeResponse> activeEmployees;
    private List<EmployeeResponse> waitingEmployees;

    public AdminAllEmployeesResponse() {

    }

    public List<EmployeeResponse> getActiveEmployees() {
        return activeEmployees;
    }

    public void setActiveEmployees(List<EmployeeResponse> activeEmployees) {
        this.activeEmployees = activeEmployees;
    }

    public List<EmployeeResponse> getWaitingEmployees() {
        return waitingEmployees;
    }

    public void setWaitingEmployees(List<EmployeeResponse> waitingEmployees) {
        this.waitingEmployees = waitingEmployees;
    }
}
