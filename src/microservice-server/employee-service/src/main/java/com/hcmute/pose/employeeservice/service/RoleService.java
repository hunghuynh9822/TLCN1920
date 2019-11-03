package com.hcmute.pose.employeeservice.service;

import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Role;

import java.sql.SQLException;
import java.util.Set;

public interface RoleService {
    Role createRole(String name) throws DatabaseException;
    Role findByName(String name) throws DatabaseException;
    Role findById(Long id) throws DatabaseException;
    Set<Role> getEmployeeRoles(Long employeeId) throws SQLException;
}
