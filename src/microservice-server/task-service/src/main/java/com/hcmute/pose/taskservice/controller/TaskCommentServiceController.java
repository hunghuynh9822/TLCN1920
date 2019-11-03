package com.hcmute.pose.taskservice.controller;


import com.hcmute.pose.taskservice.buz.TaskCommentBuz;

import com.hcmute.pose.taskservice.model.TaskComments;
import com.hcmute.pose.taskservice.payload.TaskCommentRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/")
public class TaskCommentServiceController {
    @Autowired
    private TaskCommentBuz taskCommentBuz;

    @PostMapping("/createTC")
    public ResponseEntity createTask (@Valid @RequestBody TaskCommentRequest taskCommentRequest){
        TaskComments taskComment;
        try{
            taskComment = taskCommentBuz.createTC(taskCommentRequest).orElseThrow(() -> new Exception("Not created Task"));
            return new ResponseEntity(taskComment, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listTaskComment/{taskId}")
    public ResponseEntity getListTaskByID (@PathVariable("taskId") Long taskId){
        try{
            List<TaskComments> taskList = taskCommentBuz.getListTC(taskId);
            return new ResponseEntity(taskList,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updatecomment/{id}")
    public ResponseEntity updatePoint (@PathVariable("id") Long taskId ,@RequestParam Long employeeId,@RequestParam String comment ){
        try{
            taskCommentBuz.updateTC(taskId,employeeId,comment);
            return new ResponseEntity(taskId+","+employeeId+","+comment,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity("update point fail",HttpStatus.BAD_REQUEST);
        }
    }
}
