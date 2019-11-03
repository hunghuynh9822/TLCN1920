package com.hcmute.pose.employeeservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.employeeservice.dao.RoleDao;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public class RoleDaoImpl implements RoleDao {
    private static Logger LOGGER = LoggerFactory.getLogger(RoleDaoImpl.class);

    private static String SQL_GET_ALL_ROLES = "SELECT * FROM roles";
    private static String SQL_INSERT_ROLE = "INSERT INTO roles(name,created_at,updated_at) VALUES(?,?)";
    private static String SQL_SELECT_ROLE_BY_NAME = "SELECT * FROM roles WHERE name LIKE ?";
    private static String SQL_SELECT_ROLE_BY_ID = "SELECT * FROM roles WHERE id = ?";
    private static String SQL_SELECT_ROLE_USER = "SELECT * FROM roles WHERE id IN (SELECT role_id FROM user_roles WHERE user_id= ? )";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Override
    public List<Role> getAllRole() throws SQLException {
        return databaseHelper.executeQueryListObject(Role[].class,SQL_GET_ALL_ROLES);
    }

    @Override
    public Optional<Role> createRole(String name) throws DatabaseException {
        if(this.findByName(name) == null) {
            try{
                databaseHelper.executeNonQuery(SQL_INSERT_ROLE, Statement.RETURN_GENERATED_KEYS, name, System.currentTimeMillis(), System.currentTimeMillis());
                return this.findByName(name);
            } catch (SQLException | TransactionException ex) {
                LOGGER.error("[RoleDaoImpl]:[createRole] GOT EXCEPTION ", ex);
                Optional.empty();
            }
        }
        throw new DatabaseException("Role exist");
    }

    @Override
    public Optional<Role> findByName(String name) {
        try{
            return this.databaseHelper.executeQueryObject(Role.class,SQL_SELECT_ROLE_BY_NAME,"%"+name+"%");
        }catch (SQLException ex){
            LOGGER.error("[RoleDaoImpl]:[findByName] GOT EXCEPTION ",ex);
            return Optional.empty();
        }
    }

    @Override
    public Optional<Role> findById(Long id) {
        try {
            return this.databaseHelper.executeQueryObject(Role.class,SQL_SELECT_ROLE_BY_ID,id);
        }catch (SQLException ex){
            LOGGER.error("[RoleDaoImpl]:[findByName] GOT EXCEPTION ",ex);
            return Optional.empty();
        }
    }

    @Override
    public Set<Role> getRoleUser(Long userId) throws SQLException {
        List<Role> roleList = this.databaseHelper.executeQueryListObject(Role[].class,SQL_SELECT_ROLE_USER,userId);
        Set<Role> roles = new HashSet<>();
        for (Role role:roleList) {
            roles.add(role);
        }
        return roles;
    }
}
