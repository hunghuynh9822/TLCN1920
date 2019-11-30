package com.hcmute.pose.taskservice.buz.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.taskservice.buz.TaskServiceBuz;
import com.hcmute.pose.taskservice.model.Task;
import com.hcmute.pose.taskservice.model.TaskComments;
import com.hcmute.pose.taskservice.model.TaskState;
import com.hcmute.pose.taskservice.payload.*;
import com.hcmute.pose.taskservice.service.TaskCommentService;
import com.hcmute.pose.taskservice.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class TaskServiceBuzImpl implements TaskServiceBuz {
    private static Logger LOGGER = LoggerFactory.getLogger(TaskServiceBuzImpl.class);
    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskCommentService taskCommentService;

    @Override
    public Optional<Task> createTask(TaskRequest taskRequest) throws TransactionException {
        try{
            databaseHelper.beginTransaction();
            Task task = taskService.createTask(taskRequest.getProjectId(),taskRequest.getEmployeeCreator(),taskRequest.getEmployeeAssignee(), taskRequest.getTitle(), taskRequest.getDescription(), taskRequest.getStartedAt().getTime(), taskRequest.getDuration());
            databaseHelper.commit();
            return Optional.of(task);
        }catch (Exception e) {
            return Optional.empty();
        }finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public Task getTasksById(Long taskId) throws Exception {
        try{
            return taskService.getTasksById(taskId);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public ProjectTasksResponse getTasksByProject(Long projectId) throws SQLException {
        List<CreatorTasksResponse> creatorTasks = new ArrayList<>();
        try{
            List<Long> creatorIds = taskService.getCreatorByProject(projectId);
            for(Long creatorId : creatorIds) {
                List<AssigneeTasksResponse> assigneeTasks = getAssigneeTasks(projectId, creatorId);
                creatorTasks.add(new CreatorTasksResponse(creatorId, assigneeTasks));
            }
            return new ProjectTasksResponse(projectId, creatorTasks);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public CreatorTasksResponse getTasksByCreator(Long projectId, Long creatorId) throws SQLException {
        try{
            List<AssigneeTasksResponse> assigneeTasks = getAssigneeTasks(projectId, creatorId);
            return new CreatorTasksResponse(creatorId, assigneeTasks);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    private List<AssigneeTasksResponse> getAssigneeTasks(Long projectId, Long creatorId) throws SQLException {
        List<AssigneeTasksResponse> assigneeTasksResponses = new ArrayList<>();
        try{
            List<Long> assigneeIds = taskService.getAssigneeByCreator(projectId, creatorId);
            for(Long assigneeId : assigneeIds) {
                List<Task> tasks = taskService.getTasksByAssignee(projectId, assigneeId);
                assigneeTasksResponses.add(new AssigneeTasksResponse(assigneeId, tasks));
            }
            return assigneeTasksResponses;
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public AssigneeTasksResponse getTasksByAssignee(Long projectId, Long assigneeId) throws SQLException {
        try{
            List<Task> tasks = taskService.getTasksByAssignee(projectId, assigneeId);
            return new AssigneeTasksResponse(assigneeId, tasks);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    //Long taskId, Long creatorId, Integer point
    public void updatePoint(TaskUpdateRequest request) throws TransactionException, SQLException {
        try{
            databaseHelper.beginTransaction();
            taskService.updatePoint(request.getTaskId(), request.getEmployeeId(), request.getPoint());
            databaseHelper.commit();
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    //Long taskId, Long employeeId, TaskState state
    public void updateState(TaskUpdateRequest request) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            taskService.updateState(request.getTaskId(), request.getEmployeeId(), TaskState.values()[request.getState()]);
            databaseHelper.commit();
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    //Long taskId, Long employeeId
    public void updateAssignee(TaskUpdateRequest request) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            taskService.updateAssignee(request.getTaskId(), request.getEmployeeId());
            databaseHelper.commit();
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    //Long taskId, String title, String description, Long startedAt, Integer duration, TaskState state
    public void updateTask(TaskUpdateRequest request) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            taskService.updateTask(request.getTaskId(), request.getEmployeeId(), request.getTitle(), request.getDescription(), request.getStartedAt(), request.getDuration(), TaskState.values()[request.getState()]);
            databaseHelper.commit();
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    //Long taskId, Long startedAt, Integer duration
    public void updateTaskTime(TaskUpdateRequest request) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            taskService.updateTaskTime(request.getTaskId(), request.getStartedAt(), request.getDuration());
            databaseHelper.commit();
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public Optional<TaskComments> createTaskComment(TaskCommentRequest taskCommentRequest) {
        try{
            databaseHelper.beginTransaction();
            TaskComments taskComments = taskCommentService.createTaskComment(taskCommentRequest.getTaskId(),taskCommentRequest.getEmployeeId(),taskCommentRequest.getComment());
            databaseHelper.commit();
            return Optional.of(taskComments);
        }catch (Exception | TransactionException e){

        }finally {
            databaseHelper.closeConnection();
        }
        return null;
    }

    @Override
    public List<TaskComments> getListTaskComment(Long taskId) throws SQLException {
        try{
            List<TaskComments> taskComments = taskCommentService.getListTaskComment(taskId);
            return taskComments;
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    //Long taskId, Long employeeId, String comment
    public void updateTaskComment(TaskCommentRequest request) throws SQLException, TransactionException {
        try{
            databaseHelper.beginTransaction();
            taskCommentService.updateTaskComment(request.getTaskId(), request.getEmployeeId(), request.getComment());
            databaseHelper.commit();
        } finally {
            databaseHelper.closeConnection();
        }
    }
}