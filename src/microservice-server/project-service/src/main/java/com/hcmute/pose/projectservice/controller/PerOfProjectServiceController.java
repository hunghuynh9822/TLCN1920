package com.hcmute.pose.projectservice.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.buz.PerOfProjectBuz;
import com.hcmute.pose.projectservice.model.PerOfProject;
import com.hcmute.pose.projectservice.payload.PerOfProjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/")
public class PerOfProjectServiceController {
    @Autowired
    private PerOfProjectBuz perOfProjectBuz;

    @PostMapping("/createPOP")
    public ResponseEntity createPOP (@Valid @RequestBody PerOfProjectRequest perOfProjectRequest){
        try{
            perOfProjectBuz.createPOP(perOfProjectRequest);
            return new ResponseEntity("Create POP success", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listPOP/{id}")
    public ResponseEntity getListPOP (@PathVariable("id") Long id ){
        try{
            List<PerOfProject> perOfProjects = perOfProjectBuz.getListPOP(id);
            return new ResponseEntity(perOfProjects,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePOP (@PathVariable("id") Long id,@RequestParam Long employeeId ){
        try{
            perOfProjectBuz.deletePOP(id,employeeId);
            return new ResponseEntity("Delete POP success",HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity("Delete POP fail",HttpStatus.BAD_REQUEST);
        }
    }
}
