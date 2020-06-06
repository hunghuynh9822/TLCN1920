package com.hcmute.pose.projectservice.buz.task.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.projectservice.buz.task.TaskServiceBuz;
import com.hcmute.pose.projectservice.model.task.Task;
import com.hcmute.pose.projectservice.model.task.TaskComments;
import com.hcmute.pose.projectservice.model.task.TaskLink;
import com.hcmute.pose.projectservice.model.task.TaskState;
import com.hcmute.pose.projectservice.payload.task.*;
import com.hcmute.pose.projectservice.service.task.TaskCommentService;
import com.hcmute.pose.projectservice.service.task.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.*;

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
            Task task = taskService.createTask(taskRequest.getPreTaskId(),taskRequest.getProjectId(),taskRequest.getEmployeeCreator(),taskRequest.getEmployeeAssignee(), taskRequest.getTitle(), taskRequest.getDescription(), taskRequest.getStartedAt().getTime(), taskRequest.getDuration());
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
    public AllTasksProjectResponse getAllTasksByProject(Long projectId) throws SQLException {
        try{
            List<Task> tasks = taskService.getTasksByProject(projectId);
            List<TaskResponse> taskResponses = new ArrayList<>();
            List<TaskLink> links = new ArrayList<>();
            long index = 1L;
            Long source = null;
            for (Task task : tasks
                 ) {
                TaskLink taskLink = null;
                if(source!=null) {
                    taskLink = new TaskLink(index, source, task.getId(), 0, System.currentTimeMillis(), System.currentTimeMillis());
                    links.add(taskLink);
                    index = index + 1;
                }
                source = task.getId();
                TaskResponse taskResponse = new TaskResponse(task.getId(), task.getProjectId(), task.getEmployeeCreator(), task.getEmployeeAssignee(), task.getTitle(), task.getDescription(), task.getStartedAt(), task.getDuration(), task.getDescription(), task.getPoint(), task.getCreatedAt(), task.getUpdatedAt());
                taskResponses.add(taskResponse);
            }
            return new AllTasksProjectResponse(projectId, taskResponses, links);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    @Override
    public TasksWithState getAllTasksWithStateByProject(Long projectId) throws SQLException {
        try{
            List<Task> tasks = taskService.getTasksByProject(projectId);
            return getTasksWithState(tasks);
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
    public ProjectTasksAssigneeWithStateResponse getTasksAssigneeWithStateByProject(Long projectId) throws SQLException {
        List<AssigneeTasksWithStateResponse> assigneeTasks = new ArrayList<>();
        try{
            List<Long> assignIds = taskService.getAsigneeByProject(projectId);
            for(Long assigneeId : assignIds) {
                List<Task> tasks = taskService.getTasksByAssignee(projectId, assigneeId);
                assigneeTasks.add(new AssigneeTasksWithStateResponse(assigneeId, getTasksWithState(tasks)));
            }
            return new ProjectTasksAssigneeWithStateResponse(projectId, assigneeTasks);
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

    private List<AssigneeTasksWithStateResponse> getAssigneeTasksWithState(Long projectId, Long creatorId) throws SQLException {
        List<AssigneeTasksWithStateResponse> assigneeTasksWithStateResponses = new ArrayList<>();
        try{
            List<Long> assigneeIds = taskService.getAssigneeByCreator(projectId, creatorId);
            for(Long assigneeId : assigneeIds) {
                List<Task> tasks = taskService.getTasksByAssignee(projectId, assigneeId);
                assigneeTasksWithStateResponses.add(new AssigneeTasksWithStateResponse(assigneeId, getTasksWithState(tasks)));
            }
            return assigneeTasksWithStateResponses;
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
    public TasksWithState getTasksWithStateByAssignee(Long projectId, Long assigneeId) throws SQLException {
        try{
            List<Task> tasks = taskService.getTasksByAssignee(projectId, assigneeId);
            return getTasksWithState(tasks);
        } finally {
            databaseHelper.closeConnection();
        }
    }

    private TasksWithState getTasksWithState(List<Task> tasks) {
        Map<TaskState, List<Task>> tasksWithState = new HashMap<>();
        for (Task task: tasks
        ) {
            if(tasksWithState.containsKey(task.getState())) {
                tasksWithState.get(task.getState()).add(task);
            } else {
                List<Task> tasksState = new ArrayList<>();
                tasksState.add(task);
                tasksWithState.put(task.getState(), tasksState);
            }
        }
        return new TasksWithState(tasksWithState);
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
            taskService.updateTask(request.getTaskId(),request.getPreTaskId(), request.getEmployeeId(), request.getTitle(), request.getDescription(), request.getStartedAt(), request.getDuration(), TaskState.values()[request.getState()]);
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