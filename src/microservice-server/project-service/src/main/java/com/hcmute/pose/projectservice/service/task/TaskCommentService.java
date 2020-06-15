package com.hcmute.pose.projectservice.service.task;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.task.TaskComments;

import java.sql.SQLException;
import java.util.List;

public interface TaskCommentService {
    TaskComments createTaskComment(Long taskId, Long employeeId, String comment) throws Exception;
    List<TaskComments> getListTaskComment(Long taskId) throws SQLException;
    void updateTaskComment(Long taskId, Long employeeId, String comment) throws SQLException, TransactionException;

}
