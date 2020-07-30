package com.hcmute.pose.projectservice.feign;

import com.hcmute.pose.common.feign.FeignConfiguration;
import com.hcmute.pose.projectservice.feign.dto.NotifyResponse;
import com.hcmute.pose.projectservice.feign.dto.WebHookRequestSendNotify;
import com.hcmute.pose.projectservice.payload.project.AllEmployeeResponse;
import com.hcmute.pose.projectservice.payload.project.EmployeeResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="webhook-service", configuration= FeignConfiguration.class)
public interface WebHookClient {
    @GetMapping(path = "/api/webhook/send/create_task")
    NotifyResponse sendCreateTask(@RequestBody WebHookRequestSendNotify data);
    @GetMapping(path = "/api/webhook/send/update_task")
    NotifyResponse sendUpdateTask(@RequestBody WebHookRequestSendNotify data);
    @GetMapping(path = "/api/webhook/send/update_state")
    NotifyResponse sendUpdateState(@RequestBody WebHookRequestSendNotify data);
}