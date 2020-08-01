package com.hcmute.pose.projectservice.controller.project;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.buz.project.ProjectServiceBuz;
import com.hcmute.pose.projectservice.payload.project.AllProjectDetailResponse;
import com.hcmute.pose.projectservice.payload.project.ProjectRequest;
import com.hcmute.pose.projectservice.payload.project.ProjectDetailResponse;
import com.hcmute.pose.projectservice.payload.project.ProjectsResponse;
import com.hcmute.pose.projectservice.payload.task.ReportResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

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
            ProjectDetailResponse project = projectServiceBuz.createProject(projectRequest);
            return new ResponseEntity(project, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    public ResponseEntity getProjects(){
        try{
            AllProjectDetailResponse projectList = projectServiceBuz.getListProjectDetail();
            return new ResponseEntity(projectList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/list_name")
    public ResponseEntity getProjectName(){
        try{
            ProjectsResponse projectList = projectServiceBuz.getListProject();
            return new ResponseEntity(projectList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
