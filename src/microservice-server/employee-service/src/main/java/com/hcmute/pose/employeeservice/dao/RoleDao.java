package com.hcmute.pose.employeeservice.dao;

import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Role;

import java.sql.SQLException;
import java.util.Optional;
import java.util.Set;

public interface RoleDao {
    Optional<Role> createRole(String name) throws DatabaseException;
    Optional<Role> findByName(String name);
    Optional<Role> findById(Long id);
    Set<Role> getRoleEmployee(Long employeeId) throws SQLException;
}
