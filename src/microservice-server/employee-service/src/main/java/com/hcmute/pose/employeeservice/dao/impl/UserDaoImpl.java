package com.hcmute.pose.employeeservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.employeeservice.dao.UserDao;
import com.hcmute.pose.employeeservice.model.User;
import com.hcmute.pose.genuid.GenerateUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao {
    private static Logger LOGGER = LoggerFactory.getLogger(EmployeeDaoImpl.class);

    private static final String DATA_USER = "id,email,phone,oauth2_name,image_url,email_verified,provider,provider_id";

    private static String SQL_INSERT_USER = "INSERT INTO users(id,email,phone,password,provider,email_verified,created_at) VALUES(?,?,?,?,?,?,?)";
    private static String SQL_INSERT_USER_ROLE = "INSERT INTO user_roles(user_id,role_id,create_at) VALUES(?,?,?)";

    private static String SQL_SELECT_ALL_USER = String.format("SELECT %s FROM users",DATA_USER);

    private static String SQL_SELECT_EXIST_USER_BY_EMAIL = "SELECT id as value FROM users WHERE email = ?";
    private static String SQL_SELECT_EXIST_USER_BY_PHONE = "SELECT id as value FROM users WHERE phone = ?";

    private static String SQL_SELECT_USER_BY_PHONE = String.format("SELECT %s FROM users WHERE phone = ?",DATA_USER);
    private static String SQL_SELECT_USER_BY_EMAIL = String.format("SELECT %s FROM users WHERE email = ?",DATA_USER);
    private static String SQL_SELECT_USER_BY_PHONE_OR_EMAIL = String.format("SELECT %s FROM users WHERE phone = ? OR email = ?",DATA_USER);
    private static String SQL_SELECT_USER_BY_ID = String.format("SELECT %s FROM users WHERE id = ?",DATA_USER);

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastId(){
        return generateUID.genUID();
    }

    @Override
    public Optional<User> createUser(User user) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_USER,
                    user.getId(),
                    user.getEmail(),
                    user.getPhone(),
                    user.getPassword(),
                    user.getProvider().name(),
                    false,
                    System.currentTimeMillis()
            );
            return Optional.of(user);
        }catch (SQLException | TransactionException ex){
            LOGGER.error("[UserDaoImpl]:[createUser]",ex);
            return Optional.empty();
        }
    }

    @Override
    public void addRoleToUser(Long userId, Long roleId) throws SQLException, TransactionException {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_USER_ROLE, userId, roleId, System.currentTimeMillis());
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[UserDaoImpl]:[addRoleToUser]",e);
            throw e;
        }
    }

    @Override
    public List<User> getAll() throws SQLException {
        return databaseHelper.executeQueryListObject(User[].class,SQL_SELECT_ALL_USER);
    }

    @Override
    public Optional<User> findByEmail(String email) throws SQLException {
        return this.databaseHelper.executeQueryObject(User.class,SQL_SELECT_USER_BY_EMAIL,email);
    }

    @Override
    public Optional<User> findByPhone(String phone) throws SQLException {
        return this.databaseHelper.executeQueryObject(User.class,SQL_SELECT_USER_BY_PHONE,phone);
    }

    @Override
    public Optional<User> findByPhoneOrEmail(String phone, String email) throws SQLException {
        return this.databaseHelper.executeQueryObject(User.class,SQL_SELECT_USER_BY_PHONE_OR_EMAIL,phone,email);
    }

    @Override
    public Optional<User> findById(Long id) throws SQLException {
        return this.databaseHelper.executeQueryObject(User.class,SQL_SELECT_USER_BY_ID,id);
    }

    @Override
    public Boolean existsByPhone(String phone) throws SQLException {
        return this.databaseHelper.executeQueryObject(User.class,SQL_SELECT_EXIST_USER_BY_PHONE,phone).isPresent();
    }

    @Override
    public Boolean existsByEmail(String email) throws SQLException {
        return this.databaseHelper.executeQueryObject(User.class,SQL_SELECT_EXIST_USER_BY_EMAIL,email).isPresent();
    }
}
