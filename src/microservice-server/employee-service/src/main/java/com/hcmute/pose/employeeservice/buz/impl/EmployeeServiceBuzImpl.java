package com.hcmute.pose.employeeservice.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.employeeservice.buz.EmployeeServiceBuz;
import com.hcmute.pose.employeeservice.exception.BuzException;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.*;
import com.hcmute.pose.employeeservice.payload.StateRequest;
import com.hcmute.pose.employeeservice.payload.EmployeeRequest;
import com.hcmute.pose.employeeservice.payload.EmployeeResponse;
import com.hcmute.pose.employeeservice.payload.UpdateEmployeeRequest;
import com.hcmute.pose.employeeservice.service.EmployeeService;
import com.hcmute.pose.employeeservice.service.PositionService;
import com.hcmute.pose.employeeservice.service.RoleService;
import com.hcmute.pose.employeeservice.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.*;

@Service
public class EmployeeServiceBuzImpl implements EmployeeServiceBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(EmployeeServiceBuzImpl.class);

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PositionService positionService;

    @Override
    public Optional<EmployeeResponse> createEmployeeAdmin(EmployeeRequest request) throws BuzException {
        try{
            databaseHelper.beginTransaction();

            if(userService.existsByPhone(request.getPhone())){
                LOGGER.error("[EmployeeServiceBuzImpl]:[createEmployeeAdmin] GOT UNKNOWN EXCEPTION : Phone {} already in use!",request.getPhone());
                throw new BuzException(String.format("Phone %s already in use!",request.getPhone()));
            }
            if(userService.existsByEmail(request.getEmail())){
                LOGGER.error("[EmployeeServiceBuzImpl]:[createEmployeeAdmin] GOT UNKNOWN EXCEPTION : Email {} already in use!",request.getEmail());
                throw new BuzException(String.format("Email %s already in use!",request.getEmail()));
            }

            User user = userService.createUser(request.getEmail(),request.getPhone(),request.getPassword());

            Set<Role> userRoles = updateRole(user.getId(),request.getRoles());
            user.setRoles(userRoles);

            Employee employee = callCreate(request,user);

            databaseHelper.commit();
            return Optional.of(new EmployeeResponse(user,employee));
        }catch (DatabaseException e){
            return Optional.empty();
        }catch (SQLException | TransactionException e){
            LOGGER.error("[EmployeeServiceBuzImpl]:[createEmployeeAdmin] GOT UNKNOWN EXCEPTION ",e);
            return Optional.empty();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public Optional<EmployeeResponse> createEmployee(EmployeeRequest request) throws BuzException {
        try{
            databaseHelper.beginTransaction();
            if(userService.existsByPhone(request.getPhone())){
                LOGGER.error("[EmployeeServiceBuzImpl]:[createEmployee] GOT UNKNOWN EXCEPTION : Phone {} already in use!",request.getPhone());
                throw new BuzException(String.format("Phone %s already in use!",request.getPhone()));
            }
            if(userService.existsByEmail(request.getEmail())){
                LOGGER.error("[EmployeeServiceBuzImpl]:[createEmployee] GOT UNKNOWN EXCEPTION : Email {} already in use!",request.getEmail());
                throw new BuzException(String.format("Email %s already in use!",request.getEmail()));
            }
            User user = userService.createUser(request.getEmail(),request.getPhone(),request.getPassword());
            Employee employee = callCreate(request,user);
            databaseHelper.commit();
            return Optional.of(new EmployeeResponse(user,employee));
        }catch (DatabaseException e){
            return Optional.empty();
        }catch (SQLException | TransactionException e){
            LOGGER.error("[EmployeeServiceBuzImpl]:[createEmployee] GOT UNKNOWN EXCEPTION ",e);
            return Optional.empty();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    private Employee callCreate(EmployeeRequest request, User user) throws DatabaseException {
        Employee employee = employeeService.createEmployee(user.getId(),
                request.getFirstName(),
                request.getMiddleName(),
                request.getLastName(),
                new ID(request.getIdNumber(),request.getIdCreated().getTime(),request.getIdLocation()),
                request.getAddress(),
                positionService.findById(request.getPositionId()),
                new Bank(request.getBankNumber(),request.getBankName(),request.getBankBranch()),
                request.getBirthday().getTime(),
                request.getStartTime().getTime());
        return employee;
    }

    private Set<Role> updateRole(Long userId,List<Long> roles) throws SQLException, TransactionException, DatabaseException {
        Set<Role> userRoles = new HashSet<>();
        Set<Role> preRoles = roleService.getUserRoles(userId);
        for (Role role: preRoles
             ) {
            userService.removeRoleToUser(userId, role.getId());
        }
        if(roles != null){
            for (Long id :roles
            ) {
                userService.addRoleToUser(userId,id);
                userRoles.add(roleService.findById(id));
            }
        }
        return userRoles;
    }

    @Override
    public void updateUser(StateRequest request) throws TransactionException, SQLException, DatabaseException {
        try{
            databaseHelper.beginTransaction();

            userService.updateStatus(request.getId(),request.getStatus());

            updateRole(request.getId(),request.getRoles());

            databaseHelper.commit();
        } catch (TransactionException | SQLException | DatabaseException e) {
            LOGGER.error("[EmployeeServiceBuzImpl]:[updateAcceptUser] GOT UNKNOWN EXCEPTION ", e);
            throw e;
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public List<EmployeeResponse> getEmployees(){
        try {
            List<User> users = userService.getUsers();
            return getEmployeeByListUser(users);
        } catch (SQLException e) {
            LOGGER.error("[EmployeeServiceBuzImpl]:[getEmployees] GOT UNKNOWN EXCEPTION ",e);
            return new ArrayList<>();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public List<EmployeeResponse> getEmployeesWaiting(){
        try {
            List<User> users = userService.getUsersWaiting();
            return getEmployeeByListUser(users);
        } catch (SQLException e) {
            LOGGER.error("[EmployeeServiceBuzImpl]:[getEmployees] GOT UNKNOWN EXCEPTION ",e);
            return new ArrayList<>();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    private List<EmployeeResponse> getEmployeeByListUser(List<User> users) throws SQLException {
        List<EmployeeResponse> employees = new ArrayList<>();
        for (User user:users
        ) {
            try {
                Employee employee = employeeService.findById(user.getId()).orElseThrow(() -> new BuzException(String.format("Can't find employee info %d", user.getId())));
                user.setRoles(roleService.getUserRoles(user.getId()));
                employee.setPosition(positionService.findById(employee.getPosition().getId()));
                employees.add(new EmployeeResponse(user,employee));
            }catch (BuzException | DatabaseException ex) {
                LOGGER.error("[EmployeeServiceBuzImpl]:[getEmployees] GOT UNKNOWN EXCEPTION ", ex);
            }
        }
        return employees;
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
            LOGGER.error("[EmployeeServiceBuzImpl]:[getEmployee] GOT UNKNOWN EXCEPTION ",e);
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
            user.setRoles(roleService.getUserRoles(user.getId()));
            return Optional.of(new EmployeeResponse(user, employee));
        } catch (SQLException e) {
            LOGGER.error("[EmployeeServiceBuzImpl]:[getEmployee] GOT UNKNOWN EXCEPTION ",e);
            return Optional.empty();
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public List<Role> getRoles(){
        try {
            List<Role> roles = roleService.getRoles();
            return roles;
        } catch (SQLException e) {
            LOGGER.error("[EmployeeServiceBuzImpl]:[getRoles] GOT UNKNOWN EXCEPTION ",e);
            return new ArrayList<>();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void updateEmployee(Long employeeId, UpdateEmployeeRequest request) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();

            employeeService.updateEmployee(employeeId, request.getFirstName(), request.getMiddleName(), request.getLastName(),
                    new ID(request.getIdNumber(), request.getIdCreated().getTime(), request.getIdLocation()),
                    request.getAddress(), new Bank(request.getBankNumber(), request.getBankName(), request.getBankBranch()),
                    request.getBirthday().getTime());

            databaseHelper.commit();
        } catch (TransactionException | SQLException e) {
            LOGGER.error("[EmployeeServiceBuzImpl]:[updateEmployee] GOT UNKNOWN EXCEPTION ", e);
            throw e;
        } finally {
            databaseHelper.closeConnection();
        }
    }
}
