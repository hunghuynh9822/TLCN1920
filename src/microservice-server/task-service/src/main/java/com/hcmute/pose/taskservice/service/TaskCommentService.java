package com.hcmute.pose.taskservice.service;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.model.TaskComments;

import java.sql.SQLException;
import java.util.List;

public interface TaskCommentService {
    TaskComments createTC (Long taskID, Long employeeId, Long createTime, String comment) throws Exception;
    List<TaskComments> getListTC (Long taskId) throws SQLException;
    void updateComment (Long taskid ,Long employeeId , String comment) throws SQLException, TransactionException;

}
