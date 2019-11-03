package com.hcmute.pose.employeeservice.buz;

import com.hcmute.pose.employeeservice.exception.BuzException;
import com.hcmute.pose.employeeservice.payload.EmployeeRequest;
import com.hcmute.pose.employeeservice.payload.EmployeeResponse;

import java.util.List;
import java.util.Optional;

public interface EmployeeBuz {
    Optional<EmployeeResponse> createEmployee(EmployeeRequest request) throws BuzException;
    List<EmployeeResponse> getEmployees();
    String checkPhoneOrEmail(String phoneOrEmail);
    Optional<EmployeeResponse> getEmployee(Long employeeId) throws BuzException;
}
