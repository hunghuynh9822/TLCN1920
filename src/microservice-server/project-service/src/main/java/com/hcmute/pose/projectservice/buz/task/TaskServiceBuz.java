package com.hcmute.pose.projectservice.buz.task;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.task.Task;
import com.hcmute.pose.projectservice.model.task.TaskComments;
import com.hcmute.pose.projectservice.payload.task.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface TaskServiceBuz {
    Optional<Task> createTask (TaskRequest taskRequest) throws Exception, TransactionException;
    Task getTasksById(Long taskId) throws Exception;

    AllTasksProjectResponse getDataOfProject(Long projectId) throws Exception;

    AllTasksProjectResponse getDataTasksOfProject(Long projectId) throws SQLException;
    AllTasksProjectResponse getAllTasksByProject(Long projectId) throws SQLException, Exception;
    ProjectTasksResponse getTasksByProject(Long projectId) throws SQLException;
    ProjectTasksResponse getTasksByCreator(Long projectId, Long creatorId) throws SQLException;
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
    void deleteTask (Long taskId, Long projectId) throws SQLException, TransactionException;

}


