package com.hcmute.pose.employeeservice.service;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.User;
import com.hcmute.pose.employeeservice.model.UserStatus;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(String email,String phone, String password) throws DatabaseException;
    void addRoleToUser(Long userId,Long roleId) throws SQLException, TransactionException;
    List<User> getUsers() throws SQLException;
    List<User> getUsersWaiting() throws SQLException;
    void updateStatus(Long userId, UserStatus status) throws SQLException, TransactionException;
    Optional<User> findByEmail(String email) throws SQLException;
    Optional<User> findByPhone(String phone) throws SQLException;
    Optional<User> findByPhoneOrEmail(String phoneOrEmail) throws SQLException;
    Optional<User> findById(Long userId) throws SQLException;
    Boolean existsByPhone(String phone) throws SQLException;
    Boolean existsByEmail(String email) throws SQLException;
}
