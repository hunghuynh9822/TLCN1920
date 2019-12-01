package com.hcmute.pose.taskservice.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.buz.TaskServiceBuz;
import com.hcmute.pose.taskservice.model.Task;
import com.hcmute.pose.taskservice.model.TaskComments;
import com.hcmute.pose.taskservice.payload.AssigneeTasksResponse;
import com.hcmute.pose.taskservice.payload.TaskCommentRequest;
import com.hcmute.pose.taskservice.payload.TaskRequest;
import com.hcmute.pose.taskservice.payload.TaskUpdateRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskServiceController {
    private static Logger LOGGER = LoggerFactory.getLogger(TaskServiceController.class);
    @Autowired
    private TaskServiceBuz taskServiceBuz;

    @GetMapping("/test")
    public ResponseEntity<String> testApi(){
        return new ResponseEntity<>("Test successfully", HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity createTask(@Valid @RequestBody TaskRequest taskRequest){
        Task task;
        try{
            task = taskServiceBuz.createTask(taskRequest).orElseThrow(() -> new Exception("Can not create task"));
            return new ResponseEntity<>(task, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    public ResponseEntity getTaskByProject(@RequestParam(name="project") Long projectId, @RequestParam(name="employee") Long assigneeId){
        try{
            AssigneeTasksResponse response = taskServiceBuz.getTasksByAssignee(projectId, assigneeId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/update-state")
    public ResponseEntity<String> updateState(@Valid @RequestBody TaskUpdateRequest request){
        try{
            taskServiceBuz.updateState(request);
            String message = String.format("Update state of %d successfully", request.getTaskId());
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            String message = String.format("Update state of %d failed", request.getTaskId());
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateTask(@Valid @RequestBody TaskUpdateRequest request){
        try{
            taskServiceBuz.updateTask(request);
            String message = String.format("Update task %d successfully", request.getTaskId());
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
}
