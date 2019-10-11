package com.hcmute.pose.authservice.dao;

import com.hcmute.pose.authservice.exception.DatabaseException;
import com.hcmute.pose.authservice.model.UserModel;

import java.sql.SQLException;

public interface UserDao {
    UserModel getUser(String phoneOrEmail) throws DatabaseException, SQLException;
}
