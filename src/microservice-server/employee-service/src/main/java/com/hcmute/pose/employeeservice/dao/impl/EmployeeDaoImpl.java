package com.hcmute.pose.employeeservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.employeeservice.dao.EmployeeDao;
import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.model.map.EmployeeMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.*;

@Repository
public class EmployeeDaoImpl implements EmployeeDao {
    private static Logger LOGGER = LoggerFactory.getLogger(EmployeeDaoImpl.class);

    private static final String DATA_EMPLOYEE = "id,first_name,middle_name,last_name,id_number,id_created,id_location,address,position_id,bank_number,bank_name,bank_branch,birthday,start_time,created_at";
    private static final String INSERT_DATA_EMPLOYEE = "id,first_name,middle_name,last_name,id_number,id_created,id_location,address,position_id,bank_number,bank_name,bank_branch,birthday,start_time,created_at";

    private static String SQL_INSERT_EMPLOYEE = String.format("INSERT INTO employees(%s) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",INSERT_DATA_EMPLOYEE);
    private static String SQL_SELECT_EMPLOYEE_BY_ID = String.format("SELECT %s FROM employees WHERE id = ?",DATA_EMPLOYEE);

    @Autowired
    private DatabaseHelper databaseHelper;

    public Optional<Employee> createEmployee(Employee employee) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_EMPLOYEE,
                    employee.getId(),
                    employee.getFirstName(),
                    employee.getMiddleName(),
                    employee.getLastName(),
                    employee.getIdentification().getIdNumber(),
                    employee.getIdentification().getIdCreated(),
                    employee.getIdentification().getIdLocation(),
                    employee.getAddress(),
                    employee.getPosition().getId(),
                    employee.getBank().getBankNumber(),
                    employee.getBank().getBankName(),
                    employee.getBank().getBankBranch(),
                    employee.getBirthday(),
                    employee.getStartTime(),
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
        Optional<EmployeeMap> employeeMapOptional = this.databaseHelper.executeQueryObject(EmployeeMap.class,SQL_SELECT_EMPLOYEE_BY_ID,id);
        if(employeeMapOptional.isPresent()){
            return Optional.of(employeeMapOptional.get().toEmployee());
        }
        return Optional.empty();
    }
}
