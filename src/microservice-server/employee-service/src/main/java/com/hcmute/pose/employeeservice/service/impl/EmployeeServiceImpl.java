package com.hcmute.pose.employeeservice.service.impl;

import com.hcmute.pose.employeeservice.dao.EmployeeDao;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.*;
import com.hcmute.pose.employeeservice.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeDao employeeDao;

    @Override
    public Employee createEmployee(Long employeeId, String firstName, String middleName, String lastName, ID identification, String address, Position position, Bank bank,Long birthday,Long startTime) throws DatabaseException {
        Employee employee = new Employee(employeeId,firstName,middleName,lastName,identification,address,position,bank,birthday,startTime, EmployeeStatus.CREATED);
        return employeeDao.createEmployee(employee)
                .orElseThrow(()->
                        new DatabaseException("[EmployeeServiceImpl]:[createEmployee] Can't create employee")
                );
    }

    @Override
    public Optional<Employee> findById(Long employeeId) throws SQLException {
        return employeeDao.findById(employeeId);
    }
}
