package com.hcmute.pose.employeeservice.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.employeeservice.buz.EmployeeServiceBuz;
import com.hcmute.pose.employeeservice.exception.BuzException;
import com.hcmute.pose.employeeservice.payload.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeServiceController {

    @Autowired
    private EmployeeServiceBuz employeeServiceBuz;

    @GetMapping("/test")
    public ResponseEntity test() {
        List<EmployeeResponse> employees = employeeServiceBuz.getEmployees();

        if (employees.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(true, "No employees"),
                    HttpStatus.OK);
        }

        return new ResponseEntity<>(new AllEmployeesResponse(employees), HttpStatus.OK);
    }

    @GetMapping("/")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF','LEAD','HR')")
    public ResponseEntity getEmployees() {
        List<EmployeeResponse> employees = employeeServiceBuz.getEmployees();

        if (employees.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(false, "No employees"),
                    HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new AllEmployeesResponse(employees), HttpStatus.OK);
    }

    @PostMapping("/")
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public ResponseEntity<Object> createEmployee(@Valid @RequestBody  EmployeeRequest employeeRequest){
        EmployeeResponse employee;
        try {
            employee = employeeServiceBuz.createEmployee(employeeRequest).orElseThrow(()->new BuzException("Can't create employee"));
            return new ResponseEntity<Object>(employee,HttpStatus.OK);
        } catch (BuzException e) {
            return new ResponseEntity<Object>(new ApiResponse(false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{employeeId}")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF','LEAD','HR')")
    public ResponseEntity getEmployee(@PathVariable("employeeId") Long employeeId){
        try {
            EmployeeResponse employee = employeeServiceBuz.getEmployee(employeeId).orElseThrow(()->new BuzException(""));
            return new ResponseEntity(employee,HttpStatus.OK);
        } catch (BuzException e) {
            return new ResponseEntity(new ApiResponse(false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{employeeId}")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF','LEAD','HR')")
    public ResponseEntity<ApiResponse> updateEmployee(@PathVariable("employeeId") Long employeeId, @Valid @RequestBody UpdateEmployeeRequest request){
        try {
            employeeServiceBuz.updateEmployee(employeeId,request);
            return new ResponseEntity<>(new ApiResponse(true, "Update employee success"),HttpStatus.OK);
        } catch (TransactionException | SQLException e) {
            return new ResponseEntity<>(new ApiResponse(false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/exist/{phoneOrEmail}")
    public ResponseEntity<String> checkValid(@PathVariable("phoneOrEmail") String phoneOrEmail){
        return new ResponseEntity<>(employeeServiceBuz.checkPhoneOrEmail(phoneOrEmail),HttpStatus.OK);
    }

    @PatchMapping("/password")
    public ResponseEntity updatePassword(@RequestBody UpdatePasswordRequest passwordRequest){
        try {
            employeeServiceBuz.updatePassword(passwordRequest);
            return new ResponseEntity(new ApiResponse(true, "Update user success"),HttpStatus.OK);
        } catch (SQLException | TransactionException e) {
            return new ResponseEntity(new ApiResponse(false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
