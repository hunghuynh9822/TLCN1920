package com.hcmute.pose.taskservice.dao;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.model.TaskComments;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface TaskCommentsDao {
    Optional<Long> getLastID ();
    Optional<TaskComments> createTaskComment(TaskComments taskComments);
    List<TaskComments> getListTaskComment(Long tastId) throws SQLException;
    void updateTaskComment(Long taskId, Long employeeId, String comment) throws SQLException, TransactionException;
}
