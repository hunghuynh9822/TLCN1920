package com.hcmute.pose.taskservice.buz;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.model.Task;
import com.hcmute.pose.taskservice.model.TaskComments;
import com.hcmute.pose.taskservice.payload.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface TaskServiceBuz {
    Optional<Task> createTask (TaskRequest taskRequest) throws Exception, TransactionException;
    Task getTasksById(Long taskId) throws Exception;
    AllTasksProjectResponse getAllTasksByProject(Long projectId) throws SQLException;
    ProjectTasksResponse getTasksByProject(Long projectId) throws SQLException;
    CreatorTasksResponse getTasksByCreator(Long projectId, Long creatorId) throws SQLException;
    AssigneeTasksResponse getTasksByAssignee(Long projectId, Long assigneeId) throws SQLException;

    void updatePoint(TaskUpdateRequest request) throws TransactionException, SQLException;
    void updateState(TaskUpdateRequest request) throws SQLException, TransactionException;
    void updateAssignee(TaskUpdateRequest request) throws SQLException, TransactionException;
    void updateTask(TaskUpdateRequest request) throws SQLException, TransactionException;
    void updateTaskTime(TaskUpdateRequest request) throws SQLException, TransactionException;

    Optional<TaskComments> createTaskComment(TaskCommentRequest taskCommentRequest);
    List<TaskComments> getListTaskComment(Long taskId) throws SQLException;
    void updateTaskComment(TaskCommentRequest request) throws SQLException, TransactionException;

    TasksWithState getAllTasksWithStateByProject(Long projectId) throws SQLException;
    TasksWithState getTasksWithStateByAssignee(Long projectId, Long assigneeId) throws SQLException;
    ProjectTasksAssigneeWithStateResponse getTasksAssigneeWithStateByProject(Long projectId) throws SQLException;

}


