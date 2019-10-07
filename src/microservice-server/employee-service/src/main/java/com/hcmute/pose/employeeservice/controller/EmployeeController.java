package com.hcmute.pose.employeeservice.controller;

import com.hcmute.pose.employeeservice.buz.EmployeeBuz;
import com.hcmute.pose.employeeservice.exception.BuzException;
import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.payload.ApiResponse;
import com.hcmute.pose.employeeservice.payload.EmployeeRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeBuz employeeBuz;

    @GetMapping("/{employeeId}")
    public Employee getEmployee(@PathVariable("employeeId") Long employeeId){
        return new Employee(employeeId,"hungh","123@gmail.com","123456","Huynh","Le Huu","Hung");
    }

    @PostMapping("/create")
    public ResponseEntity createEmployee(@Valid @RequestBody  EmployeeRequest employeeRequest){
        Employee employee;
        try {
            employee = employeeBuz.createEmployee(employeeRequest).orElseThrow(()->new BuzException("Can't create employee"));
            return new ResponseEntity(employee,HttpStatus.OK);
        } catch (BuzException e) {
            return new ResponseEntity(new ApiResponse(false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
