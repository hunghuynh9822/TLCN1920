package com.hcmute.pose.projectservice.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.buz.ProjectServiceBuz;
import com.hcmute.pose.projectservice.model.Project;
import com.hcmute.pose.projectservice.payload.ProjectOfPerResponse;
import com.hcmute.pose.projectservice.payload.ProjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectServiceController {
    @Autowired
    private ProjectServiceBuz projectServiceBuz;

    @PostMapping("/")
    public ResponseEntity createProject(@Valid @RequestBody ProjectRequest projectRequest){
        Project project;
        try{
            project = projectServiceBuz.createProject(projectRequest);
            return new ResponseEntity(project, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{employeeId}/all")
    public ResponseEntity getProjectOfEmployee(@PathVariable("employeeId") Long employeeId){
        try{
            ProjectOfPerResponse projectOfPerResponse = projectServiceBuz.getProjects(employeeId);
            return new ResponseEntity(projectOfPerResponse, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
