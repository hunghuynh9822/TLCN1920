package com.hcmute.pose.employeeservice.buz.impl;

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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.*;

@Service
public class EmployeeBuzImpl implements EmployeeBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(EmployeeBuzImpl.class);

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private RoleService roleService;

    @Override
    public Optional<Employee> createEmployee(EmployeeRequest request) throws BuzException {
        try{
            databaseHelper.beginTransaction();
            if(employeeService.existsByUsername(request.getUsername())){
                LOGGER.error("[EmployeeBuzImpl]:[createEmployee] GOT UNKNOWN EXCEPTION : Username exist");
                throw new BuzException(String.format("Username %s exist",request.getUsername()));
            }
            if(employeeService.existsByEmail(request.getEmail())){
                LOGGER.error("[EmployeeBuzImpl]:[createEmployee] GOT UNKNOWN EXCEPTION : Email exist");
                throw new BuzException(String.format("Email %s exist",request.getEmail()));
            }
            Employee employee = employeeService.createEmployee(request.getUsername(),request.getEmail(),request.getPassword(),request.getFirstName(),request.getMiddleName(),request.getLastName());
            Set<Role> employeeRoles = new HashSet<>();
            for (Long id :request.getRoles()
            ) {
                employeeService.addRoleToEmployee(employee.getId(),id);
                employeeRoles.add(roleService.findById(id));
            }
            employee.setRoles(employeeRoles);
            databaseHelper.commit();
            return Optional.of(employee);
        }catch (DatabaseException | TransactionException e){
            return Optional.empty();
        }catch (SQLException e){
            LOGGER.error("[EmployeeBuzImpl]:[createEmployee] GOT UNKNOWN EXCEPTION ",e);
            return Optional.empty();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public List<Employee> getEmployees(){
        try {
            List<Employee> employees = employeeService.getEmployees();
            for (Employee employee:employees
                 ) {
                employee.setRoles(roleService.getEmployeeRoles(employee.getId()));
            }
            return employees;
        } catch (SQLException e) {
            return new ArrayList<>();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public String checkUsernameOrEmail(String usernameOrEmail) throws DatabaseException {
        try {
            if(employeeService.existsByUsername(usernameOrEmail)){
                return "Exist username";
            }
            if(employeeService.existsByEmail(usernameOrEmail)){
                return "Exist email";
            }
            return "OK";
        } catch (SQLException e) {
            throw new DatabaseException(String.format("Got exception : %s",e.getMessage()));
        }
    }
}
