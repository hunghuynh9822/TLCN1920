package com.hcmute.pose.projectservice.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.buz.ProjectServiceBuz;
import com.hcmute.pose.projectservice.model.Project;
import com.hcmute.pose.projectservice.payload.AllEmployeeResponse;
import com.hcmute.pose.projectservice.payload.EmployeeProjectResponse;
import com.hcmute.pose.projectservice.payload.ProjectRequest;
import com.hcmute.pose.projectservice.payload.ProjectResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/projects")
public class ProjectServiceController {
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
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{employeeId}/all")
    public ResponseEntity getProjectOfEmployee(@PathVariable("employeeId") Long employeeId){
        try{
            EmployeeProjectResponse employeeProjectResponse = projectServiceBuz.getProjectsOfEmployee(employeeId);
            return new ResponseEntity(employeeProjectResponse, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{projectId}/employees")
    public ResponseEntity getEmployee(@PathVariable("projectId") Long projectId){
        try{
            AllEmployeeResponse allEmployeeResponse = projectServiceBuz.getEmployeesFreeForProject(projectId);
            return new ResponseEntity(allEmployeeResponse, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
