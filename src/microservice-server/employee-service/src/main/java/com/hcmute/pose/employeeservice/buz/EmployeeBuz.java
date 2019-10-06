package com.hcmute.pose.employeeservice.buz;

import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.payload.EmployeeRequest;

import java.util.Optional;

public interface EmployeeBuz {
    Optional<Employee> createEmployee(EmployeeRequest request);
}
