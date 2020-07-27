package com.hcmute.pose.projectservice.service.task.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.dao.task.TaskDao;
import com.hcmute.pose.projectservice.model.task.Task;
import com.hcmute.pose.projectservice.model.task.TaskState;
import com.hcmute.pose.projectservice.modelmap.CountStateReport;
import com.hcmute.pose.projectservice.modelmap.LongValue;
import com.hcmute.pose.projectservice.modelmap.QueryReport;
import com.hcmute.pose.projectservice.service.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskDao taskDao;

    @Override
    public Task createTask(String preTaskId, Long projectId, Long employeeCreator, Long employeeAssignee, String title, String description, Long startedAt, Integer duration) throws Exception {
        Long taskId = taskDao.getLastID().orElseThrow(()-> new Exception("Not get task generate id"));
        Task task = new Task(preTaskId,taskId,projectId,employeeCreator,employeeAssignee,title,description,startedAt,duration, TaskState.NEW,0,System.currentTimeMillis(),System.currentTimeMillis());
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
    public List<Long> getAssigneeByProject(Long projectId) throws SQLException {
        List<Long> assigneeIds = new ArrayList<>();
        List<LongValue> values = taskDao.getAssigneeByProject(projectId);
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
    public List<Task> getTasksByAssigneeAndCreator(Long projectId, Long employeeAssignee, Long employeeCreator) throws SQLException {
        return taskDao.getTasksByAssigneeAndCreator(projectId, employeeAssignee, employeeCreator);
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
    public List<Long> getAsigneeByProject(Long projectId) throws SQLException {
        List<Long> assignees = new ArrayList<>();
        List<LongValue> values = taskDao.getAssigneeByProject(projectId);
        for(LongValue value : values) {
            assignees.add(value.getValue());
        }
        return assignees;
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
    public void updateTaskToOwner(Long projectId, Long owner, Long employeeId) throws SQLException, TransactionException {
        taskDao.updateAssigneeToOwner(projectId, owner, employeeId, System.currentTimeMillis());
        taskDao.updateCreatorToOwner(projectId, owner, employeeId, System.currentTimeMillis());
    }

    @Override
    public void updateTask(Long taskId,String preTaskId, Long assigneeId, String title, String description, Long startedAt, Integer duration, TaskState state) throws SQLException, TransactionException {
        Task task = new Task(taskId, preTaskId, assigneeId, title, description, startedAt, duration, state, System.currentTimeMillis());
        taskDao.updateTask(task);
    }

    @Override
    public void updateTaskTime(Long taskId, Long startedAt, Integer duration) throws SQLException, TransactionException {
        taskDao.updateTaskTime(taskId, startedAt, duration);
    }

    @Override
    public void deleteTask(Long taskId) throws SQLException, TransactionException {
        taskDao.deleteTask(taskId);
    }

    @Override
    public void updatePreTaskId(Long taskId, String preTask) throws SQLException, TransactionException {
        taskDao.updatePreTask(taskId , preTask);
    }

    @Override
    public List<QueryReport> getNumberTaskOfProject() throws SQLException {
        return taskDao.selectNumberTaskOfProject();
    }

    @Override
    public List<QueryReport> getNumberTaskOfProjectOfEmployee(Long employeeId) throws SQLException {
        return taskDao.selectNumberTaskOfProjectOfEmployee(employeeId);
    }

    @Override
    public List<QueryReport> getNumberTaskOfEmployeeInProject(Long projectId) throws SQLException {
        return taskDao.selectNumberTaskOfEmployeeInProject(projectId);
    }

    @Override
    public List<CountStateReport> getCountStateTaskCreateByMe(Long userId) throws SQLException {
        List<CountStateReport> result = new ArrayList<>();
        List<CountStateReport> countStateReports = taskDao.selectCountStateTaskCreateByMe(userId);
        for (TaskState state : TaskState.values()
             ) {
            CountStateReport value = new CountStateReport(state, 0);
            for (CountStateReport report : countStateReports) {
                if(report.getState().equals(state)) {
                    value = report;
                    break;
                }
            }
            result.add(value);
        }
        return result;
    }

    @Override
    public List<CountStateReport> getCountStateTaskAssignToMe(Long userId) throws SQLException {
        List<CountStateReport> result = new ArrayList<>();
        List<CountStateReport> countStateReports = taskDao.selectCountStateTaskAssignToMe(userId);
        for (TaskState state : TaskState.values()
        ) {
            CountStateReport value = new CountStateReport(state, 0);
            for (CountStateReport report : countStateReports) {
                if(report.getState().equals(state)) {
                    value = report;
                    break;
                }
            }
            result.add(value);
        }
        return result;
    }
}
