package com.hcmute.pose.taskservice.controller;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.buz.TaskBuz;
import com.hcmute.pose.taskservice.model.Task;
import com.hcmute.pose.taskservice.payload.TaskRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/")
public class TaskServiceController {
    @Autowired
    private TaskBuz taskBuz;

    @PostMapping("/create")
    public ResponseEntity createTask (@Valid @RequestBody TaskRequest taskRequest){
        Task task;
        try{
            task = taskBuz.createTask(taskRequest).orElseThrow(() -> new Exception("Not created Task"));
            return new ResponseEntity(task, HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listTask")
    public ResponseEntity getListTaskByID (@RequestParam Long employeeId, @RequestParam Long projectId){
        try{
            List<Task> taskList = taskBuz.getListTaskByID(employeeId,projectId);
            return new ResponseEntity(taskList,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updatePoint/{id}")
    public ResponseEntity updatePoint (@PathVariable("id") Long id ,@RequestParam Integer point ){
        try{
            taskBuz.updatePoint(id,point);
            return new ResponseEntity("Update point success",HttpStatus.OK);
        }catch (Exception | TransactionException e){
            return new ResponseEntity("update point fail",HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updateStatus/{id}")
    public ResponseEntity updatePoint (@PathVariable("id") Long id ,@RequestParam Boolean status ){
        try{
            taskBuz.updateStatus(id,status);
            return new ResponseEntity("Update point success",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity("update point fail",HttpStatus.BAD_REQUEST);
        }
    }
}
