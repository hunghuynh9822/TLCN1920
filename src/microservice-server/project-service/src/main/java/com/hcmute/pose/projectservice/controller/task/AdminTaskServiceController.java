package com.hcmute.pose.projectservice.controller.task;

import com.hcmute.pose.projectservice.buz.task.TaskServiceBuz;
import com.hcmute.pose.projectservice.payload.task.ProjectTasksResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/tasks")
public class AdminTaskServiceController {
    private static Logger LOGGER = LoggerFactory.getLogger(AdminTaskServiceController.class);
    @Autowired
    private TaskServiceBuz taskServiceBuz;

    @GetMapping("/test")
    public ResponseEntity testApi(){
        return new ResponseEntity("Test successfully", HttpStatus.OK);
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
}
