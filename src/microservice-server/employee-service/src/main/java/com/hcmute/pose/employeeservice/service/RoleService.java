package com.hcmute.pose.employeeservice.service;

import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Role;

public interface RoleService {
    Role createRole(String name) throws DatabaseException;
    Role findByName(String name) throws DatabaseException;
    Role findById(Long id) throws DatabaseException;
}
