package com.hcmute.pose.authservice.dao;

import com.hcmute.pose.authservice.model.UserModel;
import com.hcmute.pose.database.connector.exception.TransactionException;

import java.sql.SQLException;
import java.util.Optional;

public interface UserDao {
    Optional<UserModel> getUserById(Long userId) throws SQLException;
    Optional<UserModel> getUserForLogin(String phoneOrEmail) throws SQLException;
    void updateUser(UserModel user) throws SQLException, TransactionException;
}
