package com.hcmute.pose.authservice.feign;

import com.hcmute.pose.authservice.payload.EmployeeResponse;
import com.hcmute.pose.common.feign.FeignConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="employee-service", configuration= FeignConfiguration.class)
public interface EmployeeClient {
    @GetMapping(path = "api/employees/{id}")
    EmployeeResponse getEmployee(@PathVariable("id") String employeeId);
}
