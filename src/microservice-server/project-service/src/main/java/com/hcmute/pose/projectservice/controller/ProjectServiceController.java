package com.hcmute.pose.projectservice.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.buz.ProjectBuz;
import com.hcmute.pose.projectservice.model.Project;
import com.hcmute.pose.projectservice.payload.ProjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/")
public class ProjectServiceController {
    @Autowired
    private ProjectBuz projectBuz;

    @PostMapping("/create")
    public ResponseEntity createTask (@Valid @RequestBody ProjectRequest projectRequest){
        Project project;
        try{
            project = projectBuz.ceratePro(projectRequest).orElseThrow(() -> new Exception("Not created Project"));
            return new ResponseEntity(project, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listProject")
    public ResponseEntity getListTaskByID (){
        try{
            List<Project> projectList = projectBuz.getListPro();
            return new ResponseEntity(projectList,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updateTitle/{id}")
    public ResponseEntity updatePoint (@PathVariable("id") Long id ,@RequestParam Long employeeId,@RequestParam String title ){
        try{

            projectBuz.updateTitle(id,employeeId,title);
            return new ResponseEntity("Update title success",HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity("update title fail",HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updateSubmit/{id}")
    public ResponseEntity updatePoint (@PathVariable("id") Long id ,@RequestParam Long employeeId,@RequestParam Boolean submit ){
        try{
            projectBuz.ipdateSubmit(id,employeeId,submit);
            return new ResponseEntity("Update submit success",HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity("update submit fail",HttpStatus.BAD_REQUEST);
        }
    }
}
