package com.hcmute.tlcn.workmanagement.dao;

import com.hcmute.tlcn.workmanagement.model.Role;

import java.sql.SQLException;
import java.util.Optional;

public interface RoleDao {
    Boolean createRole(String name) throws SQLException;
    Optional<Role> findByName(String name);
    Optional<Role> findById(Long id);
}
