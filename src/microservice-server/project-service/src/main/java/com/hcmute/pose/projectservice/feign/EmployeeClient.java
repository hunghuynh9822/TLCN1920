package com.hcmute.pose.projectservice.feign;

import com.hcmute.pose.common.feign.FeignConfiguration;
import com.hcmute.pose.projectservice.payload.project.AllEmployeeResponse;
import com.hcmute.pose.projectservice.payload.project.EmployeeResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="employee-service", configuration= FeignConfiguration.class)
public interface EmployeeClient {
    @GetMapping(path = "api/employees/{id}")
    EmployeeResponse getEmployee(@PathVariable("id") String employeeId);
    @GetMapping(path = "api/employees/")
    AllEmployeeResponse getAllEmployee();
}