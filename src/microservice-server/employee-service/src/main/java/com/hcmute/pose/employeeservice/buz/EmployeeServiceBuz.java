package com.hcmute.pose.employeeservice.buz;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.employeeservice.exception.BuzException;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Role;
import com.hcmute.pose.employeeservice.payload.StateRequest;
import com.hcmute.pose.employeeservice.payload.EmployeeRequest;
import com.hcmute.pose.employeeservice.payload.EmployeeResponse;
import com.hcmute.pose.employeeservice.payload.UpdateEmployeeRequest;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface EmployeeServiceBuz {
    Optional<EmployeeResponse> createEmployeeAdmin(EmployeeRequest request) throws BuzException;
    Optional<EmployeeResponse> createEmployee(EmployeeRequest request) throws BuzException;
    List<EmployeeResponse> getEmployees();
    List<EmployeeResponse> getEmployeesWaiting();
    void updateUser(StateRequest request) throws TransactionException, SQLException, DatabaseException;
    String checkPhoneOrEmail(String phoneOrEmail);
    Optional<EmployeeResponse> getEmployee(Long employeeId) throws BuzException;
    List<Role> getRoles();
    void updateEmployee(Long employeeId, UpdateEmployeeRequest request) throws SQLException, TransactionException;
}
