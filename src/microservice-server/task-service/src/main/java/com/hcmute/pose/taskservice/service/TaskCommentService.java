package com.hcmute.pose.taskservice.service;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.model.TaskComments;

import java.sql.SQLException;
import java.util.List;

public interface TaskCommentService {
    TaskComments createTaskComment(Long taskId, Long employeeId, String comment) throws Exception;
    List<TaskComments> getListTaskComment(Long taskId) throws SQLException;
    void updateTaskComment(Long taskId, Long employeeId, String comment) throws SQLException, TransactionException;

}
