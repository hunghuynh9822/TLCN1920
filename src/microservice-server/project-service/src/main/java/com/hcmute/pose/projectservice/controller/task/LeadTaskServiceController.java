package com.hcmute.pose.projectservice.controller.task;

import com.hcmute.pose.common.GsonUtils;
import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.buz.task.TaskServiceBuz;
import com.hcmute.pose.projectservice.feign.EmployeeClient;
import com.hcmute.pose.projectservice.feign.WebHookClient;
import com.hcmute.pose.projectservice.feign.dto.NotifyResponse;
import com.hcmute.pose.projectservice.feign.dto.WebHookRequestSendNotify;
import com.hcmute.pose.projectservice.model.project.Project;
import com.hcmute.pose.projectservice.model.task.Task;
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
import java.util.Date;
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
            taskServiceBuz.updatePoint(request);
            String message = String.format("Update point of %d successfully", request.getTaskId());
            executor.execute(() -> {
                try {
                    EmployeeResponse employeeUpdate = employeeClient.getEmployee(String.valueOf(request.getUpdateEmployeeId()));
                    EmployeeResponse employeeAssignee = employeeClient.getEmployee(String.valueOf(request.getEmployeeId()));
                    Project project = projectService.getProject(request.getProjectId());
                    Task task = taskServiceBuz.getTasksById(request.getTaskId());
                    String messageNotify = String.format("[Update point] User %s update task %s of %s", employeeUpdate.getFirstName() + " " + employeeUpdate.getLastName(), task.getTitle(), employeeAssignee.getFirstName() + " " + employeeAssignee.getLastName());
                    NotifyResponse notifyResponse = webHookClient.sendUpdateTask(new WebHookRequestSendNotify(request.getProjectId(), employeeUpdate.getFirstName() + " " + employeeUpdate.getLastName(), project.getTitle(), messageNotify));
                    LOGGER.info("Call webhook [updatePoint] result {} message {}", notifyResponse.getMessages(), message);
                } catch (Exception e) {
                    LOGGER.error("[updatePoint] Got exception ", e);
                }
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
            taskServiceBuz.updateAssignee(request);
            String message = String.format("Change assignee of %d successfully", request.getTaskId());
            executor.execute(() -> {
                try {
                    EmployeeResponse employeeUpdate = employeeClient.getEmployee(String.valueOf(request.getUpdateEmployeeId()));
                    EmployeeResponse employeeAssignee = employeeClient.getEmployee(String.valueOf(request.getEmployeeId()));
                    Project project = projectService.getProject(request.getProjectId());
                    Task task = taskServiceBuz.getTasksById(request.getTaskId());
                    String messageNotify = String.format("[Change assignee] User %s update assignee task %s to %s", employeeUpdate.getFirstName() + " " + employeeUpdate.getLastName(), task.getTitle(), employeeAssignee.getFirstName() + " " + employeeAssignee.getLastName());
                    NotifyResponse notifyResponse = webHookClient.sendUpdateTask(new WebHookRequestSendNotify(request.getProjectId(), employeeUpdate.getFirstName() + " " + employeeUpdate.getLastName(), project.getTitle(), messageNotify));
                    LOGGER.info("Call webhook [changeAssignee] result {} message {}", notifyResponse.getMessages(), message);
                } catch (Exception e) {
                    LOGGER.error("[changeAssignee] Got exception ", e);
                }
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
            taskServiceBuz.updateTaskTime(request);
            String message = String.format("Change time of %d successfully", request.getTaskId());
            executor.execute(() -> {
                try {
                    EmployeeResponse employeeUpdate = employeeClient.getEmployee(String.valueOf(request.getUpdateEmployeeId()));
                    Project project = projectService.getProject(request.getProjectId());
                    Task task = taskServiceBuz.getTasksById(request.getTaskId());
                    String messageNotify = String.format("[Change time] User %s change time task %s to start at %s, duration %d", employeeUpdate.getFirstName() + " " + employeeUpdate.getLastName(), task.getTitle(), new Date(request.getStartedAt()).toString(), request.getDuration());
                    NotifyResponse notifyResponse = webHookClient.sendUpdateTask(new WebHookRequestSendNotify(request.getProjectId(), employeeUpdate.getFirstName() + " " + employeeUpdate.getLastName(), project.getTitle(), messageNotify));
                    LOGGER.info("Call webhook [changeTime] result {} ", notifyResponse.getMessages());
                } catch (Exception e) {
                    LOGGER.error("[changeTime] Got exception ", e);
                }
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
            Long name = employeeId;
            taskServiceBuz.deleteTask(taskId, projectId);
            return new ResponseEntity("Delete task success", HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
