package com.hcmute.pose.employeeservice.dao;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.employeeservice.model.Employee;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface EmployeeDao {
    Optional<Long> getLastId();
    Optional<Employee> createEmployee(Employee employee);
    void addRoleToEmployee(Long employeeId,Long roleId) throws SQLException, TransactionException;
    List<Employee> getAll() throws SQLException;
//    Optional<Employee> findByEmail(String email);
//    Optional<Employee> findByUsername(String username);
//    Optional<Employee> findByUsernameOrEmail(String username, String email);
//    Optional<Employee> findById(Long id);
//    Boolean existsByUsername(String username);
//    Boolean existsByEmail(String email);
}
