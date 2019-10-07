package com.hcmute.pose.employeeservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.employeeservice.dao.EmployeeDao;
import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.model.map.SingleLong;
import com.hcmute.pose.genuid.GenerateUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.*;


@Repository
public class EmployeeDaoImpl implements EmployeeDao {
    private static Logger LOGGER = LoggerFactory.getLogger(EmployeeDaoImpl.class);

    private static String SQL_INSERT_EMPLOYEE = "INSERT INTO employees(id,username,password,email,created_at,first_name,middle_name,last_name) VALUES(?,?,?,?,?,?,?,?)";
    private static String SQL_INSERT_EMPLOYEE_ROLE = "INSERT INTO employee_roles(employee_id,role_id,create_at) VALUES(?,?,?)";

    private static String SQL_SELECT_ALL_EMPLOYEE = "SELECT id,username,email,first_name,middle_name,last_name FROM employees";

    private static String SQL_SELECT_EXIST_EMPLOYEE_BY_EMAIL = "SELECT id as value FROM employees WHERE email = ?";
    private static String SQL_SELECT_EXIST_EMPLOYEE_BY_USERNAME = "SELECT id as value FROM employees WHERE username = ?";

    private static String SQL_SELECT_EMPLOYEE_BY_USERNAME = "SELECT id,username,password,email,first_name,middle_name,last_name FROM employees WHERE username = ?";
    private static String SQL_SELECT_EMPLOYEE_BY_EMAIL = "SELECT id,username,password,email,first_name,middle_name,last_name FROM employees WHERE email = ?";
    private static String SQL_SELECT_EMPLOYEE_BY_USERNAME_OR_EMAIL = "SELECT id,username,password,email,first_name,middle_name,last_name FROM employees WHERE username = ? OR email = ?";
    private static String SQL_SELECT_EMPLOYEE_BY_ID = "SELECT id,username,password,email,first_name,middle_name,last_name FROM employees WHERE id = ?";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    public Optional<Long> getLastId(){
        return generateUID.genUID();
    }

    public Optional<Employee> createEmployee(Employee employee) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_EMPLOYEE,
                    employee.getId(),
                    employee.getUsername(),
                    employee.getPassword(),
                    employee.getEmail(),
                    System.currentTimeMillis(),
                    employee.getFirst_name(),
                    employee.getMiddle_name(),
                    employee.getLast_name()
            );
            return Optional.of(employee);
        }catch (SQLException | TransactionException ex){
            LOGGER.error("[EmployeeDaoImpl]:[createEmployee]",ex);
            return Optional.empty();
        }
    }

    @Override
    public void addRoleToEmployee(Long employeeId,Long roleId) throws SQLException, TransactionException {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_EMPLOYEE_ROLE, employeeId, roleId, System.currentTimeMillis());
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[EmployeeDaoImpl]:[addRoleToEmployee]",e);
            throw e;
        }
    }

    public List<Employee> getAll() throws SQLException {
        return databaseHelper.executeQueryListObject(Employee[].class,SQL_SELECT_ALL_EMPLOYEE);
    }

    @Override
    public Optional<Employee> findByEmail(String email) throws SQLException {
        return this.databaseHelper.executeQueryObject(Employee.class,SQL_SELECT_EMPLOYEE_BY_EMAIL,email);
    }

    @Override
    public Optional<Employee> findByUsername(String username) throws SQLException {
        return this.databaseHelper.executeQueryObject(Employee.class,SQL_SELECT_EMPLOYEE_BY_USERNAME,username);
    }

    @Override
    public Optional<Employee> findByUsernameOrEmail(String username, String email) throws SQLException {
        return this.databaseHelper.executeQueryObject(Employee.class,SQL_SELECT_EMPLOYEE_BY_USERNAME_OR_EMAIL,username,email);
    }

    @Override
    public Optional<Employee> findById(Long id) throws SQLException {
        return this.databaseHelper.executeQueryObject(Employee.class,SQL_SELECT_EMPLOYEE_BY_ID,id);
    }

    @Override
    public Boolean existsByUsername(String username) throws SQLException {
        return this.databaseHelper.executeQueryObject(SingleLong.class,SQL_SELECT_EXIST_EMPLOYEE_BY_USERNAME,username).isPresent();
    }

    @Override
    public Boolean existsByEmail(String email) throws SQLException {
        return this.databaseHelper.executeQueryObject(SingleLong.class,SQL_SELECT_EXIST_EMPLOYEE_BY_EMAIL,email).isPresent();
    }
}
