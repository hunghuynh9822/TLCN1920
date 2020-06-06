package com.hcmute.pose.projectservice.controller.project;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.buz.project.ProjectServiceBuz;
import com.hcmute.pose.projectservice.payload.project.AllProjectResponse;
import com.hcmute.pose.projectservice.payload.project.ProjectRequest;
import com.hcmute.pose.projectservice.payload.project.ProjectResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
            ProjectResponse project = projectServiceBuz.createProject(projectRequest);
            return new ResponseEntity(project, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    public ResponseEntity getProjects(){
        try{
            AllProjectResponse projectList = projectServiceBuz.getListProject();
            return new ResponseEntity(projectList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
