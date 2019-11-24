package com.hcmute.pose.taskservice.service.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.taskservice.dao.TaskDao;
import com.hcmute.pose.taskservice.dao.impl.TaskDaoImpl;
import com.hcmute.pose.taskservice.model.Task;
import com.hcmute.pose.taskservice.model.TaskState;
import com.hcmute.pose.taskservice.modelmap.LongValue;
import com.hcmute.pose.taskservice.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskDao taskDao;

    @Override
    public Task createTask(Long projectId, Long employeeCreator, Long employeeAssignee, String title, String description, Long startedAt, Integer duration) throws Exception {
        Long taskId = taskDao.getLastID().orElseThrow(()-> new Exception("Not get task generate id"));
        Task task = new Task(taskId,projectId,employeeCreator,employeeAssignee,title,description,startedAt,duration,TaskState.NEW,0,System.currentTimeMillis(),System.currentTimeMillis());
        return  taskDao.createTask(task).orElseThrow(()-> new Exception("Can not create new task"));
    }

    @Override
    public Task getTasksById(Long taskId) throws Exception {
        return taskDao.getTasksById(taskId).orElseThrow(()-> new Exception("Can not get task id : " + taskId));
    }

    @Override
    public List<Long> getAssigneeByCreator(Long projectId, Long creatorId) throws SQLException {
        List<Long> assigneeIds = new ArrayList<>();
        List<LongValue> values = taskDao.getAssigneeByCreator(projectId, creatorId);
        for(LongValue value : values) {
            assigneeIds.add(value.getValue());
        }
        return assigneeIds;
    }
    @Override
    public List<Task> getTasksByAssignee(Long projectId, Long employeeId) throws SQLException {
        return taskDao.getTasksByAssignee(projectId,employeeId);
    }

    @Override
    public List<Task> getTasksByProject(Long projectId) throws SQLException {
        return taskDao.getTasksByProject(projectId);
    }

    @Override
    public List<Long> getCreatorByProject(Long projectId) throws SQLException {
        List<Long> creators = new ArrayList<>();
        List<LongValue> values = taskDao.getCreatorByProject(projectId);
        for(LongValue value : values) {
            creators.add(value.getValue());
        }
        return creators;
    }

    @Override
    public void updatePoint(Long taskId, Long creatorId, Integer point) throws SQLException, TransactionException {
        taskDao.updatePoint(taskId, creatorId, point);
    }

    @Override
    public void updateState(Long taskId, Long employeeId, TaskState state) throws SQLException, TransactionException {
        taskDao.updateState(taskId, employeeId, state);
    }

    @Override
    public void updateAssignee(Long taskId, Long employeeId) throws SQLException, TransactionException {
        taskDao.updateAssignee(taskId, employeeId);
    }

    @Override
    public void updateTask(Long taskId, Long assigneeId, String title, String description, Long startedAt, Integer duration, TaskState state) throws SQLException, TransactionException {
        Task task = new Task(taskId, assigneeId, title, description, startedAt, duration, state, System.currentTimeMillis());
        taskDao.updateTask(task);
    }

    @Override
    public void updateTaskTime(Long taskId, Long startedAt, Integer duration) throws SQLException, TransactionException {
        taskDao.updateTaskTime(taskId, startedAt, duration);
    }
}
