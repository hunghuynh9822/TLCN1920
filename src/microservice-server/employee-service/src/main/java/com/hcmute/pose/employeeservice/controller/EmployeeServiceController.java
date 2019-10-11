package com.hcmute.pose.employeeservice.controller;

import com.hcmute.pose.employeeservice.buz.EmployeeBuz;
import com.hcmute.pose.employeeservice.exception.BuzException;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.model.Employee;
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
@RequestMapping("/api")
public class EmployeeServiceController {

    @Autowired
    private EmployeeBuz employeeBuz;

    @GetMapping("/")
    public ResponseEntity getEmployees(){
        List<EmployeeResponse> employees = employeeBuz.getEmployees();
        if(employees.isEmpty()){
            return new ResponseEntity(new ApiResponse(false, "No employees"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(new AllEmployeesResponse(employees),HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity createEmployee(@Valid @RequestBody  EmployeeRequest employeeRequest){
        EmployeeResponse employee;
        try {
            employee = employeeBuz.createEmployee(employeeRequest).orElseThrow(()->new BuzException("Can't create employee"));
            return new ResponseEntity(employee,HttpStatus.OK);
        } catch (BuzException e) {
            return new ResponseEntity(new ApiResponse(false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity getEmployee(@PathVariable("employeeId") Long employeeId){
        try {
            EmployeeResponse employee = employeeBuz.getEmployee(employeeId).orElseThrow(()->new BuzException(""));
            return new ResponseEntity(employee,HttpStatus.OK);
        } catch (BuzException e) {
            return new ResponseEntity(new ApiResponse(false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/check/{phoneOrEmail}")
    public ResponseEntity checkValid(@PathVariable("phoneOrEmail") String phoneOrEmail){
        return new ResponseEntity(employeeBuz.checkPhoneOrEmail(phoneOrEmail),HttpStatus.OK);
    }
}
