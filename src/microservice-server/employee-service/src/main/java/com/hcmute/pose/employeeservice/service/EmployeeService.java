package com.hcmute.pose.employeeservice.service;

import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Employee;

import java.sql.SQLException;
import java.util.Optional;

public interface EmployeeService {
    Employee createEmployee(Long employeeId, String firstName, String middleName, String lastName) throws DatabaseException;
    Optional<Employee> findById(Long employeeId) throws SQLException;
}
