package com.hcmute.pose.authservice.dao.impl;

import com.hcmute.pose.authservice.dao.RoleDao;
import com.hcmute.pose.authservice.model.Role;
import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Repository
public class RoleDaoImpl implements RoleDao {
    private static Logger LOGGER = LoggerFactory.getLogger(RoleDaoImpl.class);

    private static String SQL_SELECT_ROLE_USER = "SELECT * FROM roles WHERE id IN (SELECT role_id FROM user_roles WHERE user_id= ? )";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Override
    public Set<Role> getRoleUser(Long userId) throws SQLException {
        List<Role> roleList = this.databaseHelper.executeQueryListObject(Role[].class,SQL_SELECT_ROLE_USER,userId);
        Set<Role> roles = new HashSet<>();
        for (Role role:roleList
             ) {
            roles.add(role);
        }
        return roles;
    }
}
