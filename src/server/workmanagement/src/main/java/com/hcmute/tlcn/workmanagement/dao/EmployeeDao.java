package com.hcmute.tlcn.workmanagement.dao;

import com.hcmute.tlcn.workmanagement.model.Employee;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface EmployeeDao {
    Optional<Employee> createEmployee(Employee employee) throws SQLException;
    List<Employee> getAll() throws Exception;
    Optional<Employee> findByEmail(String email);
    Optional<Employee> findByUsername(String username);
    Optional<Employee> findByUsernameOrEmail(String username, String email);
    Optional<Employee> findById(Long id);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
