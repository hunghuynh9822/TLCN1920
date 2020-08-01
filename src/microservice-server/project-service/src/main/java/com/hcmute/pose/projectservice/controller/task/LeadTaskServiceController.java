package com.hcmute.pose.projectservice.controller.task;

import com.hcmute.pose.common.GsonUtils;
import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.buz.task.TaskServiceBuz;
import com.hcmute.pose.projectservice.feign.EmployeeClient;
import com.hcmute.pose.projectservice.feign.WebHookClient;
import com.hcmute.pose.projectservice.feign.dto.NotifyResponse;
import com.hcmute.pose.projectservice.feign.dto.WebHookRequestSendNotify;
import com.hcmute.pose.projectservice.model.project.Project;
import com.hcmute.pose.projectservice.payload.project.EmployeeResponse;
import com.hcmute.pose.projectservice.payload.task.TaskUpdateRequest;
import com.hcmute.pose.projectservice.service.project.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/api/lead/tasks")
public class LeadTaskServiceController {
    private static Logger LOGGER = LoggerFactory.getLogger(LeadTaskServiceController.class);
    @Autowired
    private TaskServiceBuz taskServiceBuz;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private EmployeeClient employeeClient;

    @Autowired
    private WebHookClient webHookClient;

    private ExecutorService executor = Executors.newFixedThreadPool(10);

    @GetMapping("/test")
    public ResponseEntity testApi(){
        return new ResponseEntity("Test successfully with ", HttpStatus.OK);
    }

    @PatchMapping("/update-point")
    public ResponseEntity<String> updatePoint (@Valid @RequestBody TaskUpdateRequest request){
        try{
            LOGGER.info("update-point {}", GsonUtils.toJson(request));
            EmployeeResponse employee = employeeClient.getEmployee(String.valueOf(request.getEmployeeId()));
            Project project = projectService.getProject(request.getProjectId());
            taskServiceBuz.updatePoint(request);
            String message = String.format("Update point of %d successfully", request.getTaskId());
            executor.execute(() -> {
                NotifyResponse notifyResponse = webHookClient.sendUpdateTask(new WebHookRequestSendNotify(request.getProjectId(), employee.getFirstName() + " " + employee.getLastName(), project.getTitle(), message));
                LOGGER.info("Call webhook [updatePoint] result {} message {}", notifyResponse.getMessages(), message);

            });
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            String message = String.format("Update point of %d failed", request.getTaskId());
            return new ResponseEntity<>(message,HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/change-assignee")
    public ResponseEntity<String> changeAssignee (@Valid @RequestBody TaskUpdateRequest request){
        try{
            LOGGER.info("change-assignee {}", GsonUtils.toJson(request));
            EmployeeResponse employee = employeeClient.getEmployee(String.valueOf(request.getEmployeeId()));
            Project project = projectService.getProject(request.getProjectId());
            taskServiceBuz.updateAssignee(request);
            String message = String.format("Change assignee of %d successfully", request.getTaskId());
            executor.execute(() -> {
                NotifyResponse notifyResponse = webHookClient.sendUpdateTask(new WebHookRequestSendNotify(request.getProjectId(), employee.getFirstName() + " " + employee.getLastName(), project.getTitle(), message));
                LOGGER.info("Call webhook [changeAssignee] result {} message {}", notifyResponse.getMessages(), message);
            });
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            String message = String.format("Change assignee of %d failed", request.getTaskId());
            return new ResponseEntity<>(message,HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/change-time")
    public ResponseEntity<String> changeTime (@Valid @RequestBody TaskUpdateRequest request){
        try{
            LOGGER.info("change-time {}", GsonUtils.toJson(request));
            EmployeeResponse employee = employeeClient.getEmployee(String.valueOf(request.getEmployeeId()));
            Project project = projectService.getProject(request.getProjectId());
            taskServiceBuz.updateTaskTime(request);
            String message = String.format("Change time of %d successfully", request.getTaskId());
            executor.execute(() -> {
                NotifyResponse notifyResponse = webHookClient.sendUpdateTask(new WebHookRequestSendNotify(request.getProjectId(), employee.getFirstName() + " " + employee.getLastName(), project.getTitle(), message));
                LOGGER.info("Call webhook [changeTime] result {} ", notifyResponse.getMessages());
            });
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            String message = String.format("Change time of %d failed", request.getTaskId());
            return new ResponseEntity<>(message,HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteTaskByProject(@RequestParam(name="employee") Long employeeId, @RequestParam(name="project") Long projectId, @RequestParam(name="taskId") Long taskId){
        try{
            taskServiceBuz.deleteTask(taskId, projectId);
            return new ResponseEntity("Delete task success", HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
