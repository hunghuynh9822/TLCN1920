package com.hcmute.pose.taskservice.service;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.model.Task;

import java.sql.SQLException;
import java.util.List;

public interface TaskService {
    Task createTask (Long employee,Long projectid, String title, Integer duration) throws Exception;
    List<Task> getListTaskByID (Long projectId, Long employeeId) throws SQLException;
    void updatePoint (Long taskId , Integer point) throws SQLException, TransactionException;
    void updateStatus (Long taskId, Boolean status) throws SQLException, TransactionException;
    Boolean exitsTask (Long employeeId, Long projectId, String title) throws SQLException;
}
