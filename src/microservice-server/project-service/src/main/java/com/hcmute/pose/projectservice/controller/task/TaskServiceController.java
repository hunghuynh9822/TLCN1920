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
import com.hcmute.pose.projectservice.model.task.TaskComments;
import com.hcmute.pose.projectservice.payload.project.EmployeeResponse;
import com.hcmute.pose.projectservice.payload.task.*;
import com.hcmute.pose.projectservice.service.project.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/api/tasks")
public class TaskServiceController {
    private static Logger LOGGER = LoggerFactory.getLogger(TaskServiceController.class);
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
    public ResponseEntity<String> testApi(){
        return new ResponseEntity<>("Test successfully", HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity createTask(@Valid @RequestBody TaskRequest taskRequest){
        Task task;
        try{
            Long creatorId = taskRequest.getEmployeeCreator();
            EmployeeResponse creator = employeeClient.getEmployee(String.valueOf(creatorId));
            Project project = projectService.getProject(taskRequest.getProjectId());
            task = taskServiceBuz.createTask(taskRequest).orElseThrow(() -> new Exception("Can not create task"));
            String message = GsonUtils.toJson(task);
            executor.execute(() -> {
                NotifyResponse notifyResponse = webHookClient.sendCreateTask(new WebHookRequestSendNotify(taskRequest.getProjectId(), creator.getFirstName() + " " + creator.getLastName(), project.getTitle(), message));
                LOGGER.info("Call webhook [createTask] result {} message {}", notifyResponse.getMessages(), message);
            });
            return new ResponseEntity<>(task, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    public ResponseEntity getTaskByProject(@RequestParam(name="project") Long projectId){
        try{
            ProjectTasksResponse response = taskServiceBuz.getTasksByProject(projectId);
            return new ResponseEntity(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping("/")
//    public ResponseEntity getTaskByProject(@RequestParam(name="project") Long projectId, @RequestParam(name="employee") Long creatorId){
//        try{
//            ProjectTasksResponse response = taskServiceBuz.getTasksByCreator(projectId, creatorId);
//            return new ResponseEntity(response, HttpStatus.OK);
//        }catch (Exception e){
//            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
//        }
//    }

//    @GetMapping("/")
//    public ResponseEntity getTasksByAssignee(@RequestParam(name="project") Long projectId, @RequestParam(name="employee") Long assigneeId){
//        try{
//            AssigneeTasksResponse response = taskServiceBuz.getTasksByAssignee(projectId, assigneeId);
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        }catch (Exception e){
//            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
//        }
//    }

    @GetMapping("/project")
    public ResponseEntity getAllTaskByProject(@RequestParam(name="project") Long projectId){
        try{
            AllTasksProjectResponse response = taskServiceBuz.getAllTasksByProject(projectId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/project/state")
    public ResponseEntity getAllTaskWithStateByProject(@RequestParam(name="project") Long projectId){
        try{
            TasksWithState response = taskServiceBuz.getAllTasksWithStateByProject(projectId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/state")
    public ResponseEntity getTasksWithStateByAssignee(@RequestParam(name="project") Long projectId, @RequestParam(name="employee") Long assigneeId){
        try{
            TasksWithState response = taskServiceBuz.getTasksWithStateByAssignee(projectId, assigneeId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/update-state")
    public ResponseEntity<String> updateState(@Valid @RequestBody TaskUpdateRequest request){
        try{
            EmployeeResponse employee = employeeClient.getEmployee(String.valueOf(request.getEmployeeId()));
            Project project = projectService.getProject(request.getProjectId());
            taskServiceBuz.updateState(request);
            String message = String.format("Update state of %d successfully", request.getTaskId());
            executor.execute(() -> {
                NotifyResponse notifyResponse = webHookClient.sendUpdateState(new WebHookRequestSendNotify(request.getProjectId(), employee.getFirstName() + " " + employee.getLastName(), project.getTitle(), message));
                LOGGER.info("Call webhook [updateState] result {} message {}", notifyResponse.getMessages(), message);

            });
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            String message = String.format("Update state of %d failed", request.getTaskId());
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateTask(@Valid @RequestBody TaskUpdateRequest request){
        try {
            EmployeeResponse employee = employeeClient.getEmployee(String.valueOf(request.getEmployeeId()));
            Project project = projectService.getProject(request.getProjectId());
            taskServiceBuz.updateTask(request);
            String message = String.format("Update task %d successfully", request.getTaskId());
            executor.execute(() -> {
                NotifyResponse notifyResponse = webHookClient.sendUpdateTask(new WebHookRequestSendNotify(request.getProjectId(), employee.getFirstName() + " " + employee.getLastName(), project.getTitle(), message));
                LOGGER.info("Call webhook [updateTask] result {} message {}", notifyResponse.getMessages(), message);

            });
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            String message = String.format("Update task %d failed", request.getTaskId());
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/comment")
    public ResponseEntity createTaskComment(@Valid @RequestBody TaskCommentRequest taskCommentRequest){
        TaskComments taskComment;
        try{
            taskComment = taskServiceBuz.createTaskComment(taskCommentRequest).orElseThrow(() -> new Exception("Can not create a comment"));
            return new ResponseEntity<>(taskComment, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/comment/{taskId}")
    public ResponseEntity getListTaskComment(@PathVariable("taskId") Long taskId){
        try{
            List<TaskComments> taskList = taskServiceBuz.getListTaskComment(taskId);
            return new ResponseEntity(taskList,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/comment")
    public ResponseEntity<String> updateTaskComment(@Valid @RequestBody TaskCommentRequest request){
        try{
            taskServiceBuz.updateTaskComment(request);
            String message = String.format("Update comment of %d | %d | %s successfully", request.getTaskId(), request.getEmployeeId(), request.getComment());
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            String message = String.format("Update comment of %d | %d | %s failed", request.getTaskId(), request.getEmployeeId(), request.getComment());
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    //Report
    @GetMapping("/project/assignee/state")
    public ResponseEntity getTasksWithStateByProject(@RequestParam(name="project") Long projectId){
        try{
            ProjectTasksAssigneeWithStateResponse response = taskServiceBuz.getTasksAssigneeWithStateByProject(projectId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
