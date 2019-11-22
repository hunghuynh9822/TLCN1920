package com.hcmute.pose.projectservice.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.buz.ProjectServiceBuz;
import com.hcmute.pose.projectservice.model.Project;
import com.hcmute.pose.projectservice.payload.AllProjectResponse;
import com.hcmute.pose.projectservice.payload.ProjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/admin/projects")
public class AdminProjectServiceController {
    @Autowired
    private ProjectServiceBuz projectServiceBuz;

    @GetMapping("/test")
    public ResponseEntity testApi(){
        return new ResponseEntity("Test successfully", HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity createProject(@Valid @RequestBody ProjectRequest projectRequest){
        try{
            Project project = projectServiceBuz.createProject(projectRequest);
            return new ResponseEntity(project, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    public ResponseEntity getProjects(){
        try{
            List<Project> projectList = projectServiceBuz.getListProject();
            return new ResponseEntity(new AllProjectResponse(projectList),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
