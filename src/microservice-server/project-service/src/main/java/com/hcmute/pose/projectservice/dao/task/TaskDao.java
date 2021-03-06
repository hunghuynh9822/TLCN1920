package com.hcmute.pose.projectservice.dao.task;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.projectservice.model.task.Task;
import com.hcmute.pose.projectservice.model.task.TaskState;
import com.hcmute.pose.projectservice.modelmap.CountStateReport;
import com.hcmute.pose.projectservice.modelmap.LongValue;
import com.hcmute.pose.projectservice.modelmap.QueryReport;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface TaskDao {
    Optional<Long> getLastID();
    Optional<Task> createTask(Task task);
    Optional<Task> getTasksById(Long taskId) throws SQLException;
    List<LongValue> getAssigneeByCreator(Long projectId, Long employeeId) throws SQLException;
    List<Task> getTasksByAssignee(Long projectId, Long employeeId) throws SQLException;

    List<Task> getTasksByAssigneeAndCreator(Long projectId, Long employeeAssignee, Long employeeCreator) throws SQLException;

    List<Task> getTasksByProject(Long projectId) throws SQLException;
    List<LongValue> getCreatorByProject(Long projectId) throws SQLException;
    List<LongValue> getAssigneeByProject(Long projectId) throws SQLException;
    void updatePoint(Long taskId, Long creatorId, Integer point) throws SQLException, TransactionException;
    void updateState(Long taskId, Long employeeId, TaskState state) throws SQLException, TransactionException;
    void updateTask(Task task) throws SQLException, TransactionException;
    void updateTaskTime(Long taskId, Long startedAt, Integer duration) throws SQLException, TransactionException;
    void updateAssignee(Long taskId, Long employeeId) throws SQLException, TransactionException;

    void updateAssigneeToOwner(Long projectId, Long owner, Long assigneeId,Long updatedAt) throws SQLException, TransactionException;

    void updateCreatorToOwner(Long projectId, Long owner, Long creatorId, Long updatedAt) throws SQLException, TransactionException;

    void deleteTask(Long taskId) throws SQLException, TransactionException;
    void updatePreTask(Long taskId, String preTask) throws SQLException, TransactionException;

    List<QueryReport> selectNumberTaskOfProject() throws SQLException;

    List<QueryReport> selectNumberTaskOfProjectOfEmployee(Long employeeId) throws SQLException;

    List<QueryReport> selectNumberTaskOfEmployeeInProject(Long projectId) throws SQLException;

    List<CountStateReport> selectCountStateTaskCreateByMe(Long userId) throws SQLException;

    List<CountStateReport> selectCountStateTaskAssignToMe(Long userId) throws SQLException;
}
