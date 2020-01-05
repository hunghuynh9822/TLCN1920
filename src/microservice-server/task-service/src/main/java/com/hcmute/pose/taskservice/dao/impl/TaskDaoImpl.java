package com.hcmute.pose.taskservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.taskservice.dao.TaskDao;
import com.hcmute.pose.taskservice.model.Task;
import com.hcmute.pose.taskservice.model.TaskState;
import com.hcmute.pose.taskservice.modelmap.LongValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
@Repository
public class TaskDaoImpl implements TaskDao {
    private static Logger LOGGER = LoggerFactory.getLogger(TaskDaoImpl.class);
    private static String SQL_INSERT_TASK = "INSERT INTO tasks(id,project_id,employee_creator,employee_assignee,title,description,started_at,duration,state,point,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    private static String SQl_SELECT_TASK_BY_ID = "SELECT * FROM tasks WHERE id = ?";
    private static String SQl_SELECT_ASSIGNEE_BY_CREATOR = "SELECT employee_assignee as value FROM tasks WHERE employee_creator = ? AND project_id = ? GROUP BY employee_assignee";
    private static String SQl_SELECT_TASK_BY_ASSIGNEE = "SELECT * FROM tasks WHERE employee_assignee = ? AND project_id = ?";
    private static String SQl_SELECT_TASK_BY_PROJECT = "SELECT * FROM tasks WHERE project_id = ?";
    private static String SQl_SELECT_CREATOR_BY_PROJECT = "SELECT employee_creator as value FROM tasks WHERE project_id = ? GROUP BY employee_creator";
    private static String SQl_SELECT_ASSIGNEE_BY_PROJECT = "SELECT employee_assignee as value FROM tasks WHERE project_id = ? GROUP BY employee_creator";

    private static String SQL_UPDATE_POINT = "UPDATE tasks SET point=?, updated_at=? WHERE id=? AND employee_creator=?";
    private static String SQL_UPDATE_STATE = "UPDATE tasks SET state=?, updated_at=? WHERE id=? AND ( employee_creator=? OR employee_assignee=? )";
    private static String SQL_UPDATE_TASK = "UPDATE tasks SET employee_assignee=?, title=?, description=?, started_at=?, duration=?, state=?, updated_at=? WHERE id=?";
    private static String SQL_UPDATE_TASK_TIME = "UPDATE tasks SET started_at=?, duration=?, updated_at=? WHERE id=?";
    private static String SQL_UPDATE_ASSIGNEE = "UPDATE tasks SET employee_assignee=?, updated_at=? WHERE id=?";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastID() {
        return generateUID.genUID();
    }

    @Override
    public Optional<Task> createTask(Task task) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_TASK,
                    task.getId(),
                    task.getProjectId(),
                    task.getEmployeeCreator(),
                    task.getEmployeeAssignee(),
                    task.getTitle(),
                    task.getDescription(),
                    task.getStartedAt(),
                    task.getDuration(),
                    task.getState().ordinal(),
                    task.getPoint(),
                    task.getCreatedAt(),
                    task.getUpdatedAt()
                    );
            return Optional.of(task);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[TaskDaoImpl]:[createTask]", e);
            return Optional.empty();
        }
    }

    @Override
    public Optional<Task> getTasksById(Long taskId) throws SQLException {
        try {
            return databaseHelper.executeQueryObject(Task.class,SQl_SELECT_TASK_BY_ID, taskId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getTasksByCreator]",e);
            throw e;
        }
    }

    @Override
    public List<LongValue> getAssigneeByCreator(Long projectId, Long employeeId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(LongValue[].class, SQl_SELECT_ASSIGNEE_BY_CREATOR, employeeId, projectId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getTasksByCreator]",e);
            throw e;
        }
    }

    @Override
    public List<Task> getTasksByAssignee(Long projectId, Long employeeId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(Task[].class,SQl_SELECT_TASK_BY_ASSIGNEE,employeeId,projectId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getTasksByAssignee]",e);
            throw e;
        }
    }

    @Override
    public List<Task> getTasksByProject(Long projectId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(Task[].class,SQl_SELECT_TASK_BY_PROJECT,projectId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getTasksByProject]",e);
            throw e;
        }
    }

    @Override
    public List<LongValue> getCreatorByProject(Long projectId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(LongValue[].class,SQl_SELECT_CREATOR_BY_PROJECT,projectId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getCreatorByProject]",e);
            throw e;
        }
    }

    @Override
    public List<LongValue> getAssigneeByProject(Long projectId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(LongValue[].class,SQl_SELECT_ASSIGNEE_BY_PROJECT,projectId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getAssigneeByProject]",e);
            throw e;
        }
    }

    @Override
    public void updatePoint(Long taskId, Long creatorId, Integer point) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_POINT, point, System.currentTimeMillis(), taskId, creatorId);
    }

    @Override
    public void updateState(Long taskId, Long employeeId, TaskState state) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_STATE, state.ordinal(), System.currentTimeMillis(), taskId, employeeId, employeeId);
    }

    @Override
    public void updateAssignee(Long taskId, Long employeeId) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_ASSIGNEE, employeeId, System.currentTimeMillis(), taskId);
    }

    @Override
    public void updateTask(Task task) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_TASK,
                task.getEmployeeAssignee(),
                task.getTitle(),
                task.getDescription(),
                task.getStartedAt(),
                task.getDuration(),
                task.getState().ordinal(),
                task.getUpdatedAt(),
                task.getId());
    }

    @Override
    public void updateTaskTime(Long taskId, Long startedAt, Integer duration) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_TASK_TIME,
                startedAt,
                duration,
                System.currentTimeMillis(),
                taskId);
    }
}
