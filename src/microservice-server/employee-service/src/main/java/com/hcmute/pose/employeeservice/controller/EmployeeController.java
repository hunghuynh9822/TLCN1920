package com.hcmute.pose.employeeservice.controller;

import com.hcmute.pose.employeeservice.buz.EmployeeBuz;
import com.hcmute.pose.employeeservice.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeBuz employeeBuz;

    @RequestMapping("/{employeeId}")
    public Employee getEmployee(@PathVariable("employeeId") Long employeeId){
        return new Employee(employeeId,"hungh","123@gmail.com","123456","Huynh","Le Huu","Hung");
    }
}
