package com.hcmute.pose.projectservice.service.task;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.task.Task;
import com.hcmute.pose.projectservice.model.task.TaskState;
import com.hcmute.pose.projectservice.modelmap.CountStateReport;
import com.hcmute.pose.projectservice.modelmap.QueryReport;

import java.sql.SQLException;
import java.util.List;

public interface TaskService {
    Task createTask(String preTaskId, Long projectId, Long employeeCreator, Long employeeAssignee, String title, String description, Long startedAt, Integer duration) throws Exception;
    Task getTasksById(Long taskId) throws Exception;
    List<Long> getAssigneeByCreator(Long projectId, Long creatorId) throws SQLException;
    List<Long> getAssigneeByProject(Long projectId) throws SQLException;
    List<Task> getTasksByAssignee(Long projectId, Long employeeId) throws SQLException;

    List<Task> getTasksByAssigneeAndCreator(Long projectId, Long employeeAssignee, Long employeeCreator) throws SQLException;

    List<Task> getTasksByProject(Long projectId) throws SQLException;
    List<Long> getCreatorByProject(Long projectId) throws SQLException;
    List<Long> getAsigneeByProject(Long projectId) throws SQLException;
    void updatePoint(Long taskId, Long creatorId, Integer point) throws SQLException, TransactionException;
    void updateState(Long taskId, Long employeeId, TaskState state) throws SQLException, TransactionException;
    void updateAssignee(Long taskId, Long employeeId) throws SQLException, TransactionException;

    void updateTaskToOwner(Long projectId, Long owner, Long assigneeId) throws SQLException, TransactionException;

    void updateTask(Long taskId, String preTaskId, Long assigneeId, String title, String description, Long startedAt, Integer duration, TaskState state) throws SQLException, TransactionException;

    void updateTaskTime(Long taskId, Long startedAt, Integer duration) throws SQLException, TransactionException;
    void deleteTask(Long taskId) throws SQLException, TransactionException;
    void updatePreTaskId (Long taskId , String preTask) throws SQLException, TransactionException;

    List<QueryReport> getNumberTaskOfProject() throws SQLException;

    List<QueryReport> getNumberTaskOfProjectOfEmployee(Long employeeId) throws SQLException;

    List<QueryReport> getNumberTaskOfEmployeeInProject(Long projectId) throws SQLException;

    List<CountStateReport> getCountStateTaskCreateByMe(Long userId) throws SQLException;

    List<CountStateReport> getCountStateTaskAssignToMe(Long userId) throws SQLException;
}
