package com.hcmute.pose.employeeservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.employeeservice.dao.EmployeeDao;
import com.hcmute.pose.employeeservice.model.Employee;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.*;


@Repository
public class EmployeeDaoImpl implements EmployeeDao {
    private static Logger LOGGER = LoggerFactory.getLogger(EmployeeDaoImpl.class);

    private static final String DATA_EMPLOYEE = "id,first_name,middle_name,last_name";

    private static String SQL_INSERT_EMPLOYEE = "INSERT INTO employees(id,first_name,middle_name,last_name,created_at) VALUES(?,?,?,?,?)";
    private static String SQL_SELECT_EMPLOYEE_BY_ID = String.format("SELECT %s FROM employees WHERE id = ?",DATA_EMPLOYEE);

    @Autowired
    private DatabaseHelper databaseHelper;

    public Optional<Employee> createEmployee(Employee employee) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_EMPLOYEE,
                    employee.getId(),
                    employee.getFirst_name(),
                    employee.getMiddle_name(),
                    employee.getLast_name(),
                    System.currentTimeMillis()
            );
            return Optional.of(employee);
        }catch (SQLException | TransactionException ex){
            LOGGER.error("[EmployeeDaoImpl]:[createEmployee]",ex);
            return Optional.empty();
        }
    }

    @Override
    public Optional<Employee> findById(Long id) throws SQLException {
        return this.databaseHelper.executeQueryObject(Employee.class,SQL_SELECT_EMPLOYEE_BY_ID,id);
    }
}
