package com.hcmute.pose.employeeservice.service.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.employeeservice.dao.UserDao;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.User;
import com.hcmute.pose.employeeservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private BCryptPasswordEncoder encoder;

    public UserServiceImpl(){

    }

    @Override
    public User createUser(String email, String phone, String password) throws DatabaseException {
        Long userId = userDao.getLastId()
                .orElseThrow(()->
                        new DatabaseException("[UserServiceImpl]:[createUser] Can't get last id user")
                );
        User user = new User(userId,email,phone,encoder.encode(password));
        return userDao.createUser(user).orElseThrow(()->
                new DatabaseException("[UserServiceImpl]:[createUser] Can't create user")
        );
    }

    @Override
    public void addRoleToUser(Long userId, Long roleId) throws SQLException, TransactionException {
        userDao.addRoleToUser(userId,roleId);
    }

    @Override
    public List<User> getUsers() throws SQLException {
        return userDao.getAll();
    }

    @Override
    public Optional<User> findByEmail(String email) throws SQLException {
        return userDao.findByEmail(email);
    }

    @Override
    public Optional<User> findByPhone(String phone) throws SQLException {
        return userDao.findByPhone(phone);
    }

    @Override
    public Optional<User> findByPhoneOrEmail(String phoneOrEmail) throws SQLException {
        return userDao.findByPhoneOrEmail(phoneOrEmail,phoneOrEmail);
    }

    @Override
    public Optional<User> findById(Long userId) throws SQLException {
        return userDao.findById(userId);
    }

    @Override
    public Boolean existsByPhone(String phone) throws SQLException {
        return userDao.existsByPhone(phone);
    }

    @Override
    public Boolean existsByEmail(String email) throws SQLException {
        return userDao.existsByEmail(email);
    }
}
