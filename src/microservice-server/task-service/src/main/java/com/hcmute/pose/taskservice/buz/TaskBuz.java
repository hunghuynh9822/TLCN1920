package com.hcmute.pose.taskservice.buz;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.model.Task;
import com.hcmute.pose.taskservice.payload.TaskRequest;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface TaskBuz {
    Optional<Task> createTask (TaskRequest taskRequest) throws Exception, TransactionException;
    List<Task> getListTaskByID (Long employeeId, Long projectId);
    void updatePoint(Long id,Integer point) throws SQLException, TransactionException;
    void updateStatus(Long id,Boolean status);
}


