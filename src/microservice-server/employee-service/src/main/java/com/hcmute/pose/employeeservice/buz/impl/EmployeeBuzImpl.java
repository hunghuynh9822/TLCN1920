package com.hcmute.pose.employeeservice.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.employeeservice.buz.EmployeeBuz;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.model.Role;
import com.hcmute.pose.employeeservice.payload.EmployeeRequest;
import com.hcmute.pose.employeeservice.service.EmployeeService;
import com.hcmute.pose.employeeservice.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class EmployeeBuzImpl implements EmployeeBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(EmployeeBuzImpl.class);

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private RoleService roleService;

    public Optional<Employee> createEmployee(EmployeeRequest request) {
        try{
            databaseHelper.beginTransaction();
            Employee employee = employeeService.createEmployee(request.getUsername(),request.getEmail(),request.getPassword(),request.getFirstName(),request.getMiddleName(),request.getLastName());
            Set<Role> employeeRoles = new HashSet<>();
            for (Long id :request.getRoles()
            ) {
                employeeService.addRoleToEmployee(employee.getId(),id);
                employeeRoles.add(roleService.findById(id));
            }
            employee.setRoles(employeeRoles);
            databaseHelper.commit();
            databaseHelper.closeConnection();
            return Optional.of(employee);
        }catch (DatabaseException | TransactionException e){
            return Optional.empty();
        }catch (SQLException e){
            LOGGER.error("[EmployeeBuzImpl]:[createEmployee] GOT UNKNOWN EXCEPTION ",e);
            return Optional.empty();
        }
    }
}
