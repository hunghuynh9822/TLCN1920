package com.hcmute.pose.projectservice.controller.project;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.buz.project.ProjectServiceBuz;
import com.hcmute.pose.projectservice.model.project.ProjectState;
import com.hcmute.pose.projectservice.payload.project.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/projects")
public class ProjectServiceController {
    private static Logger LOGGER = LoggerFactory.getLogger(ProjectServiceController.class);
    @Autowired
    private ProjectServiceBuz projectServiceBuz;

    @GetMapping("/test")
    public ResponseEntity testApi(){
        return new ResponseEntity("Test successfully", HttpStatus.OK);
    }

    /**
     * Create project
     * @param projectRequest
     * @return
     */
    @PostMapping("/")
    public ResponseEntity createProject(@Valid @RequestBody ProjectRequest projectRequest){
        try{
            ProjectDetailResponse project = projectServiceBuz.createProject(projectRequest);
            return new ResponseEntity(project, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Get project and employee in project
     * @param projectId
     * @return
     */
    @GetMapping("/{projectId}")
    public ResponseEntity getProject(@PathVariable("projectId") Long projectId){
        try{
            ProjectDetailResponse projectDetailResponse = projectServiceBuz.getProject(projectId);
            return new ResponseEntity(projectDetailResponse, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Get project of employee
     * @param employeeId
     * @return
     */
    @GetMapping("/{employeeId}/all")
    public ResponseEntity getProjectOfEmployee(@PathVariable("employeeId") Long employeeId){
        try{
            EmployeeProjectResponse employeeProjectResponse = projectServiceBuz.getProjectsOfEmployee(employeeId);
            return new ResponseEntity(employeeProjectResponse, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     *
     * @param projectId
     * @return
     */
    @GetMapping("/{projectId}/employees")
    public ResponseEntity getEmployee(@PathVariable("projectId") Long projectId){
        try{
            AllEmployeeResponse allEmployeeResponse = projectServiceBuz.getEmployeesFreeForProject(projectId);
            return new ResponseEntity(allEmployeeResponse, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{projectId}/update-state")
    public ResponseEntity<String> updateState (@PathVariable("projectId") Long projectId, @RequestParam(name="state") Integer state){
        try{
            projectServiceBuz.updateState(projectId, ProjectState.values()[state]);
            String message = String.format("Update state of %d successfully", projectId);
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            LOGGER.error("",e);
            String message = String.format("Update state project of %d failed", projectId);
            return new ResponseEntity<>(message,HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProject(@Valid @RequestBody ProjectUpdateRequest request){
        try{
            projectServiceBuz.updateProject(request);
            String message = String.format("Update project %d successfully", request.getProjectId());
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            String message = String.format("Update project %d failed", request.getProjectId());
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/invite")
    public ResponseEntity<String> createPerOfProject(@Valid @RequestBody PerOfProjectRequest perOfProjectRequest){
        try{
            projectServiceBuz.createPOP(perOfProjectRequest);
            return new ResponseEntity<>("Create person of project successfully", HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> deletePerOfProject(@Valid @RequestBody PerOfProjectRequest perOfProjectRequest){
        try{
            projectServiceBuz.deletePOP(perOfProjectRequest);
            return new ResponseEntity<>("Delete person of project successfully", HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
