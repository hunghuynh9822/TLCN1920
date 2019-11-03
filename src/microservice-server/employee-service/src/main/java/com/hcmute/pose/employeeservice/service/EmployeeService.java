package com.hcmute.pose.employeeservice.service;

import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Bank;
import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.model.ID;
import com.hcmute.pose.employeeservice.model.Position;

import java.sql.SQLException;
import java.util.Optional;

public interface EmployeeService {
    Employee createEmployee(Long employeeId, String firstName, String middleName, String lastName, ID identification, String address, Position position, Bank bank, Long birthday, Long startTime) throws DatabaseException;
    Optional<Employee> findById(Long employeeId) throws SQLException;
}
