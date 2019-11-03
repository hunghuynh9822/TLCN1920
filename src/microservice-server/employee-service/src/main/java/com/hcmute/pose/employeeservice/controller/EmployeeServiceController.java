package com.hcmute.pose.employeeservice.controller;

import com.hcmute.pose.employeeservice.buz.EmployeeServiceBuz;
import com.hcmute.pose.employeeservice.exception.BuzException;
import com.hcmute.pose.employeeservice.payload.AllEmployeesResponse;
import com.hcmute.pose.employeeservice.payload.ApiResponse;
import com.hcmute.pose.employeeservice.payload.EmployeeRequest;
import com.hcmute.pose.employeeservice.payload.EmployeeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeServiceController {

    @Autowired
    private EmployeeServiceBuz employeeServiceBuz;

    @GetMapping("/")
    public ResponseEntity getEmployees() {
        List<EmployeeResponse> employees = employeeServiceBuz.getEmployees();

        if (employees.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(false, "No employees"),
                    HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new AllEmployeesResponse(employees), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity createEmployee(@Valid @RequestBody  EmployeeRequest employeeRequest){
        EmployeeResponse employee;
        try {
            employee = employeeServiceBuz.createEmployee(employeeRequest).orElseThrow(()->new BuzException("Can't create employee"));
            return new ResponseEntity(employee,HttpStatus.OK);
        } catch (BuzException e) {
            return new ResponseEntity(new ApiResponse(false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity getEmployee(@PathVariable("employeeId") Long employeeId){
        try {
            EmployeeResponse employee = employeeServiceBuz.getEmployee(employeeId).orElseThrow(()->new BuzException(""));
            return new ResponseEntity(employee,HttpStatus.OK);
        } catch (BuzException e) {
            return new ResponseEntity(new ApiResponse(false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/exist/{phoneOrEmail}")
    public ResponseEntity<String> checkValid(@PathVariable("phoneOrEmail") String phoneOrEmail){
        return new ResponseEntity<>(employeeServiceBuz.checkPhoneOrEmail(phoneOrEmail),HttpStatus.OK);
    }
}
