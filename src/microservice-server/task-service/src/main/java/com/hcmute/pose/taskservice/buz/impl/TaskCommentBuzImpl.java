package com.hcmute.pose.taskservice.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.taskservice.buz.TaskCommentBuz;
import com.hcmute.pose.taskservice.model.TaskComments;
import com.hcmute.pose.taskservice.payload.TaskCommentRequest;
import com.hcmute.pose.taskservice.service.TaskCommentService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class TaskCommentBuzImpl implements TaskCommentBuz {

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private TaskCommentService taskCommentService;

    @Override
    public Optional<TaskComments> createTC(TaskCommentRequest taskCommentRequest) {
        try{
            databaseHelper.beginTransaction();
            TaskComments taskComments = taskCommentService.createTC(taskCommentRequest.getTaskId(),taskCommentRequest.getEmployeeId(),System.currentTimeMillis(),taskCommentRequest.getComment());
            databaseHelper.commit();
            return Optional.of(taskComments);
        }catch (Exception | TransactionException e){

        }finally {
            databaseHelper.closeConnection();
        }
        return null;
    }

    @Override
    public List<TaskComments> getListTC(Long taskId) {
        try{
            List<TaskComments> taskComments = taskCommentService.getListTC(taskId);
            return taskComments;
        }catch (Exception e){
            return new ArrayList<>();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public void updateTC(Long taskId, Long employeeId, String comment) {
        try{
            taskCommentService.updateComment(taskId,employeeId,comment);
        }catch (Exception | TransactionException e){

        }finally {
            databaseHelper.closeConnection();
        }
    }
}
