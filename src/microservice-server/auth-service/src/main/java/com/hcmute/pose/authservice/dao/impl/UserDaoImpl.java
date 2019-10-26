package com.hcmute.pose.authservice.dao.impl;

import com.hcmute.pose.authservice.dao.UserDao;
import com.hcmute.pose.authservice.model.UserModel;
import com.hcmute.pose.authservice.model.UserStatus;
import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao {
    private static Logger LOGGER = LoggerFactory.getLogger(UserDaoImpl.class);

    private static String SQL_SELECT_USER = "SELECT id,email,phone,password,oauth2_name,image_url,email_verified,provider,provider_id,status FROM users WHERE ( email=? OR phone=? ) AND status = ?";
    private static String SQL_SELECT_USER_BY_ID = " SELECT id,email,phone,oauth2_name,image_url,email_verified,provider,provider_id,status FROM users WHERE id = ? AND status = ?";
    private static String SQL_UPDATE_USER_OAUTH2 = "UPDATE users SET provider=?,provider_id=?,oauth2_name=?,image_url=?,email_verified=? WHERE id=?";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Override
    public Optional<UserModel> getUserById(Long userId) throws SQLException {
        try {
//            UserModel user = databaseHelper.executeQueryObject(UserModel.class,SQL_SELECT_USER_BY_ID,userId).orElseThrow(()->new DatabaseException("Can't find user with id"));
            return databaseHelper.executeQueryObject(UserModel.class,SQL_SELECT_USER_BY_ID,userId,UserStatus.ACCEPTED.ordinal());
        } catch (SQLException e) {
            LOGGER.error("[UserDaoImpl]:[getUser] GOT EXCEPTION ",e);
            throw e;
        }
    }

    @Override
    public  Optional<UserModel> getUserForLogin(String phoneOrEmail) throws SQLException {
        try {
//            UserModel user = databaseHelper.executeQueryObject(UserModel.class,SQL_SELECT_USER,phoneOrEmail,phoneOrEmail).orElseThrow(()->new DatabaseException("Can't find user with phone or email"));
            return databaseHelper.executeQueryObject(UserModel.class,SQL_SELECT_USER,phoneOrEmail,phoneOrEmail, UserStatus.ACCEPTED.ordinal());
        } catch (SQLException e) {
            LOGGER.error("[UserDaoImpl]:[getUser] GOT EXCEPTION ",e);
            throw e;
        }
    }

    @Override
    public void updateUser(UserModel user) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_USER_OAUTH2,
                user.getProvider().name(),
                        user.getProviderId(),
                        user.getOauth2Name(),
                        user.getImageUrl(),
                        true,
                        user.getId()
                );
    }
}
