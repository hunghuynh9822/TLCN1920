package com.hcmute.pose.authservice.dao;

import com.hcmute.pose.authservice.model.Role;

import java.sql.SQLException;
import java.util.Set;

public interface RoleDao {
    Set<Role> getRoleUser(Long userId) throws SQLException;
}
