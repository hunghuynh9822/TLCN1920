package com.hcmute.pose.taskservice.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.buz.TaskServiceBuz;
import com.hcmute.pose.taskservice.payload.CreatorTasksResponse;
import com.hcmute.pose.taskservice.payload.TaskUpdateRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/lead/tasks")
public class LeadTaskServiceController {
    private static Logger LOGGER = LoggerFactory.getLogger(LeadTaskServiceController.class);
    @Autowired
    private TaskServiceBuz taskServiceBuz;

    @GetMapping("/test")
    public ResponseEntity testApi(){
        return new ResponseEntity("Test successfully", HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity getTaskByProject(@RequestParam(name="project") Long projectId, @RequestParam(name="employee") Long creatorId){
        try{
            CreatorTasksResponse response = taskServiceBuz.getTasksByCreator(projectId, creatorId);
            return new ResponseEntity(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/update-point")
    public ResponseEntity<String> updatePoint (@Valid @RequestBody TaskUpdateRequest request){
        try{
            taskServiceBuz.updatePoint(request);
            String message = String.format("Update point of %d successfully", request.getTaskId());
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            String message = String.format("Update point of %d failed", request.getTaskId());
            return new ResponseEntity<>(message,HttpStatus.BAD_REQUEST);
        }
    }
}