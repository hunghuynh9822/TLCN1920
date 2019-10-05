package com.hcmute.pose.employeeservice.buz.impl;

import com.hcmute.pose.database.connector.DataSource;
import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.employeeservice.buz.EmployeeBuz;
import com.hcmute.pose.employeeservice.exception.BuzException;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.model.Role;
import com.hcmute.pose.employeeservice.payload.EmployeeRequest;
import com.hcmute.pose.employeeservice.service.EmployeeService;
import com.hcmute.pose.employeeservice.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public class EmployeeBuzImpl implements EmployeeBuz {

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private RoleService roleService;

    public void createEmployee(EmployeeRequest request) throws DatabaseException, SQLException, TransactionException {
        databaseHelper.beginTransaction();
        Employee employee = employeeService.createEmployee(request.getUsername(),request.getEmail(),request.getPassword(),request.getFirst_name(),request.getMiddle_name(),request.getLast_name());
        for (Long id :request.getRoles()
             ) {
            employeeService.addRoleToEmployee(employee.getId(),id);
        }
        databaseHelper.commit();
        databaseHelper.closeConnection();
    }
}
