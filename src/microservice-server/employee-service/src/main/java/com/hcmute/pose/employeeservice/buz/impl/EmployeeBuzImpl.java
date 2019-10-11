package com.hcmute.pose.employeeservice.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.employeeservice.buz.EmployeeBuz;
import com.hcmute.pose.employeeservice.exception.BuzException;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.model.Role;
import com.hcmute.pose.employeeservice.model.User;
import com.hcmute.pose.employeeservice.payload.EmployeeRequest;
import com.hcmute.pose.employeeservice.payload.EmployeeResponse;
import com.hcmute.pose.employeeservice.service.EmployeeService;
import com.hcmute.pose.employeeservice.service.RoleService;
import com.hcmute.pose.employeeservice.service.UserService;
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
    private UserService userService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private RoleService roleService;

    @Override
    public Optional<EmployeeResponse> createEmployee(EmployeeRequest request) throws BuzException {
        try{
            databaseHelper.beginTransaction();
            if(userService.existsByPhone(request.getPhone())){
                LOGGER.error("[EmployeeBuzImpl]:[createEmployee] GOT UNKNOWN EXCEPTION : Phone {} already in use!",request.getPhone());
                throw new BuzException(String.format("Phone %s already in use!",request.getPhone()));
            }
            if(userService.existsByEmail(request.getEmail())){
                LOGGER.error("[EmployeeBuzImpl]:[createEmployee] GOT UNKNOWN EXCEPTION : Email {} already in use!",request.getEmail());
                throw new BuzException(String.format("Email %s already in use!",request.getEmail()));
            }
            User user = userService.createUser(request.getEmail(),request.getPhone(),request.getPassword());
            Set<Role> userRoles = new HashSet<>();
            for (Long id :request.getRoles()
            ) {
                userService.addRoleToUser(user.getId(),id);
                userRoles.add(roleService.findById(id));
            }
            user.setRoles(userRoles);
            Employee employee = employeeService.createEmployee(user.getId(),request.getFirstName(),request.getMiddleName(),request.getLastName());
            databaseHelper.commit();
            return Optional.of(new EmployeeResponse(user,employee));
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
    public List<EmployeeResponse> getEmployees(){
        try {
            List<EmployeeResponse> employees = new ArrayList<>();
            List<User> users = userService.getUsers();
            for (User user:users
                 ) {
                try {
                    Employee employee = employeeService.findById(user.getId()).orElseThrow(() -> new BuzException(String.format("Can't find employee info %d", user.getId())));
                    user.setRoles(roleService.getEmployeeRoles(employee.getId()));
                    employees.add(new EmployeeResponse(user,employee));
                }catch (BuzException ex){
                    LOGGER.error("[EmployeeBuzImpl]:[getEmployees] GOT UNKNOWN EXCEPTION ",ex);
                }
            }
            return employees;
        } catch (SQLException e) {
            LOGGER.error("[EmployeeBuzImpl]:[getEmployees] GOT UNKNOWN EXCEPTION ",e);
            return new ArrayList<>();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public String checkPhoneOrEmail(String phoneOrEmail) {
        try {
            if(userService.existsByPhone(phoneOrEmail)){
                return "Phone already in use!";
            }
            if(userService.existsByEmail(phoneOrEmail)){
                return "Email already in use!";
            }
            return "OK";
        } catch (SQLException e) {
            LOGGER.error("[EmployeeBuzImpl]:[getEmployee] GOT UNKNOWN EXCEPTION ",e);
            return "Check failed";
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public Optional<EmployeeResponse> getEmployee(Long employeeId) throws BuzException {
        try {
            User user = userService.findById(employeeId).orElseThrow(() -> new BuzException(String.format("Can't find user with %d", employeeId)));
            Employee employee = employeeService.findById(user.getId()).orElseThrow(() -> new BuzException(String.format("Can't find employee info %d", user.getId())));
            user.setRoles(roleService.getEmployeeRoles(employee.getId()));
            return Optional.of(new EmployeeResponse(user, employee));
        } catch (SQLException e) {
            LOGGER.error("[EmployeeBuzImpl]:[getEmployee] GOT UNKNOWN EXCEPTION ",e);
            return Optional.empty();
        } finally {
            databaseHelper.closeConnection();
        }
    }
}
