package com.hcmute.pose.employeeservice.dao;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.employeeservice.model.User;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface UserDao {
    Optional<Long> getLastId();
    Optional<User> createUser(User user);
    void addRoleToUser(Long userId,Long roleId) throws SQLException, TransactionException;
    List<User> getAll() throws SQLException;
    Optional<User> findByEmail(String email) throws SQLException;
    Optional<User> findByPhone(String phone) throws SQLException;
    Optional<User> findByPhoneOrEmail(String phone, String email) throws SQLException;
    Optional<User> findById(Long id) throws SQLException;
    Boolean existsByPhone(String phone) throws SQLException;
    Boolean existsByEmail(String email) throws SQLException;
}