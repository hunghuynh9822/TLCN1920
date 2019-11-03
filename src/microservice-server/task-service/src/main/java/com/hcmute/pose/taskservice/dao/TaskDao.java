package com.hcmute.pose.taskservice.dao;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.model.Task;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface TaskDao {
    Optional<Long> getLastID ();
    Optional<Task> createTask (Task task);
    List<Task> getListTaskByID (Long projectID, Long employeeID) throws SQLException;
    void updatePoint (Long taskID , int point) throws SQLException, TransactionException;
    void updateStatus (Long taskID, boolean status) throws SQLException, TransactionException;
    Boolean exitsTask (Long employeeId, Long projecuId, String title) throws SQLException;
}
