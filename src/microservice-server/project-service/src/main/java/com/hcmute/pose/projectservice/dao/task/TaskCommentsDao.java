package com.hcmute.pose.projectservice.dao.task;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.task.TaskComments;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface TaskCommentsDao {
    Optional<Long> getLastID();
    Optional<TaskComments> createTaskComment(TaskComments taskComments);
    List<TaskComments> getListTaskComment(Long taskId) throws SQLException;
    void updateTaskComment(Long taskId, Long employeeId, String comment) throws SQLException, TransactionException;
}
