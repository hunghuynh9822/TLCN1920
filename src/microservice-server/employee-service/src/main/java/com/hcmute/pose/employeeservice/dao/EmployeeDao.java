package com.hcmute.pose.employeeservice.dao;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.employeeservice.model.Employee;

import java.sql.SQLException;
import java.util.Optional;

public interface EmployeeDao {
    Optional<Long> getLastId();
    Optional<Employee> createEmployee(Employee employee);
    void addRoleToEmployee(Long employeeId,Long roleId) throws SQLException, TransactionException;
}
