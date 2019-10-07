package com.hcmute.pose.employeeservice.service.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.employeeservice.dao.EmployeeDao;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeDao employeeDao;

    @Override
    public Employee createEmployee(String username, String email, String password, String firstName, String middleName, String lastName) throws DatabaseException {
        Long employeeId;
        employeeId = employeeDao.getLastId()
                .orElseThrow(()->
                        new DatabaseException("[EmployeeServiceImpl]:[createEmployee] Can't get last id employee")
                );
        Employee employee = new Employee(employeeId,username,email,password,firstName,middleName,lastName);
        return employeeDao.createEmployee(employee)
                .orElseThrow(()->
                        new DatabaseException("[EmployeeServiceImpl]:[createEmployee] Can't create employee")
                );
    }

    @Override
    public void addRoleToEmployee(Long employeeId,Long roleId) throws SQLException, TransactionException {
        employeeDao.addRoleToEmployee(employeeId,roleId);
    }

    @Override
    public List<Employee> getEmployees() throws SQLException {
        return employeeDao.getAll();
    }
}
