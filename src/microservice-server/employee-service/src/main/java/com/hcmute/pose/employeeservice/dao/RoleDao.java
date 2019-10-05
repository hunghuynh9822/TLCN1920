package com.hcmute.pose.employeeservice.dao;

import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Role;

import java.util.Optional;

public interface RoleDao {
    Optional<Role> createRole(String name) throws DatabaseException;
    Optional<Role> findByName(String name);
    Optional<Role> findById(Long id);
}
