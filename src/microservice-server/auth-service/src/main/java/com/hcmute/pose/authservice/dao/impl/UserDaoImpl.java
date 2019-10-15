package com.hcmute.pose.authservice.dao.impl;

import com.hcmute.pose.authservice.dao.UserDao;
import com.hcmute.pose.authservice.exception.DatabaseException;
import com.hcmute.pose.authservice.model.UserModel;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;

@Repository
public class UserDaoImpl implements UserDao {
    private static Logger LOGGER = LoggerFactory.getLogger(UserDaoImpl.class);

    private static String SQL_SELECT_USER = "SELECT id,email,phone,password FROM users WHERE email=? OR phone=?";
    private static String SQL_SELECT_USER_BY_ID = " SELECT id,email,phone,password FROM users WHERE id = ?";


    @Autowired
    private DatabaseHelper databaseHelper;

    @Override
    public UserModel getUserById(Long userId) throws DatabaseException, SQLException {
        try {
            UserModel user = databaseHelper.executeQueryObject(UserModel.class,SQL_SELECT_USER_BY_ID,userId).orElseThrow(()->new DatabaseException("Can't find user with id"));
            return user;
        } catch (SQLException e) {
            LOGGER.error("[UserDaoImpl]:[getUser] GOT EXCEPTION ",e);
            throw e;
        }
    }

    @Override
    public UserModel getUser(String phoneOrEmail) throws DatabaseException, SQLException {
        try {
            UserModel user = databaseHelper.executeQueryObject(UserModel.class,SQL_SELECT_USER,phoneOrEmail,phoneOrEmail).orElseThrow(()->new DatabaseException("Can't find user with phone or email"));
            return user;
        } catch (SQLException e) {
            LOGGER.error("[UserDaoImpl]:[getUser] GOT EXCEPTION ",e);
            throw e;
        }
    }
}
