package com.hcmute.pose.employeeservice.service;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Employee;

import java.sql.SQLException;
import java.util.List;

public interface EmployeeService {
    Employee createEmployee(String username, String email, String password, String firstName, String middleName, String lastName) throws DatabaseException;
    void addRoleToEmployee(Long employeeId,Long roleId) throws SQLException, TransactionException;
    List<Employee> getEmployees() throws SQLException;
}
