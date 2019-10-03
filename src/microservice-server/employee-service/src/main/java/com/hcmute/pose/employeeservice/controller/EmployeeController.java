package com.hcmute.pose.employeeservice.controller;

import com.hcmute.pose.employeeservice.model.Employee;
import com.hcmute.pose.employeeservice.model.Role;
import com.hcmute.pose.employeeservice.model.RoleName;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    @RequestMapping("/{employeeId}")
    public Employee getEmployee(@PathVariable("employeeId") Long employeeId){
        return new Employee(employeeId,"hungh","123@gmail.com","123456", Collections.singleton(new Role(RoleName.ROLE_ADMIN.name())),"Huynh","Le Huu","Hung");
    }
}
