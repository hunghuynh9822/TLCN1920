package com.hcmute.pose.taskservice.service;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.model.Task;
import com.hcmute.pose.taskservice.model.TaskState;
import com.hcmute.pose.taskservice.modelmap.LongValue;

import java.sql.SQLException;
import java.util.List;

public interface TaskService {
    Task createTask(String preTaskId, Long projectId, Long employeeCreator, Long employeeAssignee, String title, String description, Long startedAt, Integer duration) throws Exception;
    Task getTasksById(Long taskId) throws Exception;
    List<Long> getAssigneeByCreator(Long projectId, Long creatorId) throws SQLException;
    List<Task> getTasksByAssignee(Long projectId, Long employeeId) throws SQLException;
    List<Task> getTasksByProject(Long projectId) throws SQLException;
    List<Long> getCreatorByProject(Long projectId) throws SQLException;
    List<Long> getAsigneeByProject(Long projectId) throws SQLException;
    void updatePoint(Long taskId, Long creatorId, Integer point) throws SQLException, TransactionException;
    void updateState(Long taskId, Long employeeId, TaskState state) throws SQLException, TransactionException;
    void updateAssignee(Long taskId, Long employeeId) throws SQLException, TransactionException;

    void updateTask(Long taskId, String preTaskId, Long assigneeId, String title, String description, Long startedAt, Integer duration, TaskState state) throws SQLException, TransactionException;

    void updateTaskTime(Long taskId, Long startedAt, Integer duration) throws SQLException, TransactionException;
}
