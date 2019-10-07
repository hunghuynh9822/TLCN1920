package com.hcmute.pose.employeeservice.buz;

import com.hcmute.pose.employeeservice.exception.BuzException;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.payload.EmployeeRequest;

import java.util.List;
import java.util.Optional;

public interface EmployeeBuz {
    Optional<Employee> createEmployee(EmployeeRequest request) throws BuzException;
    List<Employee> getEmployees();
    String checkUsernameOrEmail(String usernameOrEmail) throws DatabaseException;
}
