package com.hcmute.pose.employeeservice.dao;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.employeeservice.model.Employee;

import java.sql.SQLException;
import java.util.Optional;

public interface EmployeeDao {
    Optional<Employee> createEmployee(Employee employee);
    Optional<Employee> findById(Long id) throws SQLException;
    void updateEmployee(Employee employee) throws SQLException, TransactionException;
}
