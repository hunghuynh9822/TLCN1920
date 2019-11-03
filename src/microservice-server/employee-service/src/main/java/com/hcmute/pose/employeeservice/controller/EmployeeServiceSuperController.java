package com.hcmute.pose.employeeservice.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.employeeservice.buz.EmployeeServiceBuz;
import com.hcmute.pose.employeeservice.exception.BuzException;
import com.hcmute.pose.employeeservice.exception.DatabaseException;
import com.hcmute.pose.employeeservice.payload.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/employees")
public class EmployeeServiceSuperController {

    @Autowired
    private EmployeeServiceBuz employeeServiceBuz;

    @GetMapping("/")
    public ResponseEntity getEmployeesAdmin(){
        List<EmployeeResponse> employees = employeeServiceBuz.getEmployees();
        List<EmployeeResponse> employeesWaiting = employeeServiceBuz.getEmployeesWaiting();

        if(employeesWaiting.isEmpty()){
            if(employees.isEmpty()){
                return new ResponseEntity<>(new ApiResponse(false, "No employees"),
                        HttpStatus.BAD_REQUEST);
            }
        }

        AdminAllEmployeesResponse allEmployees = new AdminAllEmployeesResponse();
        allEmployees.setActiveEmployees(employees);
        allEmployees.setWaitingEmployees(employeesWaiting);

        return new ResponseEntity<>(allEmployees, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity createEmployee(@Valid @RequestBody  EmployeeRequest employeeRequest){
        EmployeeResponse employee;
        try {
            employee = employeeServiceBuz.createEmployeeAdmin(employeeRequest).orElseThrow(()->new BuzException("Can't create employee"));
            return new ResponseEntity(employee,HttpStatus.OK);
        } catch (BuzException e) {
            return new ResponseEntity(new ApiResponse(false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/state")
    public ResponseEntity updateStateEmployee(@RequestBody StateRequest stateRequest){
        try {
            employeeServiceBuz.updateAcceptUser(stateRequest);
            return new ResponseEntity(new ApiResponse(true, "Update user success"),HttpStatus.OK);
        } catch (DatabaseException | SQLException | TransactionException e) {
            return new ResponseEntity(new ApiResponse(false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
