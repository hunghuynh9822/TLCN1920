package com.hcmute.pose.projectservice.dao.task.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.projectservice.dao.task.TaskDao;
import com.hcmute.pose.projectservice.model.task.Task;
import com.hcmute.pose.projectservice.model.task.TaskState;
import com.hcmute.pose.projectservice.modelmap.CountStateReport;
import com.hcmute.pose.projectservice.modelmap.LongValue;
import com.hcmute.pose.projectservice.modelmap.QueryReport;
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
    private static String SQL_INSERT_TASK = "INSERT INTO tasks(id,project_id,employee_creator,employee_assignee,title,description,started_at,duration,state,point,created_at,updated_at,pre_task_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    private static String SQl_SELECT_TASK_BY_ID = "SELECT * FROM tasks WHERE id = ?";
    private static String SQl_SELECT_ASSIGNEE_BY_CREATOR = "SELECT employee_assignee as value FROM tasks WHERE employee_creator = ? AND project_id = ? GROUP BY employee_assignee";
    private static String SQl_SELECT_TASK_BY_ASSIGNEE = "SELECT * FROM tasks WHERE employee_assignee = ? AND project_id = ?";
    private static String SQl_SELECT_TASK_BY_ASSIGNEE_AND_CREATOR = "SELECT * FROM tasks WHERE employee_assignee = ? AND employee_creator = ? AND project_id = ?";
    private static String SQl_SELECT_TASK_BY_PROJECT = "SELECT * FROM tasks WHERE project_id = ? order by started_at, id"; //id
    private static String SQl_SELECT_CREATOR_BY_PROJECT = "SELECT employee_creator as value FROM tasks WHERE project_id = ? GROUP BY employee_creator";
    private static String SQl_SELECT_ASSIGNEE_BY_PROJECT = "SELECT employee_assignee as value FROM tasks WHERE project_id = ? GROUP BY employee_assignee";

//    private static String SQL_UPDATE_POINT = "UPDATE tasks SET point=?, updated_at=? WHERE id=? AND employee_creator=?";
    private static String SQL_UPDATE_POINT = "UPDATE tasks SET point=?, updated_at=? WHERE id=?";
    private static String SQL_UPDATE_STATE = "UPDATE tasks SET state=?, updated_at=? WHERE id=? AND ( employee_creator=? OR employee_assignee=? )";
    private static String SQL_UPDATE_TASK = "UPDATE tasks SET employee_assignee=?, title=?, description=?, pre_task_id=?, started_at=?, duration=?, state=?, updated_at=? WHERE id=?";
    private static String SQL_UPDATE_TASK_TIME = "UPDATE tasks SET started_at=?, duration=?, updated_at=? WHERE id=?";
    private static String SQL_UPDATE_ASSIGNEE = "UPDATE tasks SET employee_assignee=?, updated_at=? WHERE id=?";
    private static String SQL_UPDATE_ASSIGNEE_TO_OWNER = "UPDATE tasks SET employee_assignee = ?, updated_at = ? WHERE employee_assignee = ? AND project_id = ?";
    private static String SQL_UPDATE_CREATOR_TO_OWNER = "UPDATE tasks SET employee_creator = ?, updated_at = ? WHERE employee_creator = ? AND project_id = ?";
    private static String SQL_DELETE_TASK = "DELETE FROM tasks WHERE id=?";
    private static String SQL_UPDATE_PRETASK = "UPDATE tasks SET pre_task_id=? WHERE id=?";
    //
    private static String SQL_SELECT_NUMBER_TASK_PROJECT = "Select projects.id as id, projects.title as name, (count(1)-count(case when tasks.id is null then 1 end)) as number from tasks RIGHT JOIN projects ON tasks.project_id = projects.id group by projects.id,projects.title;";
    private static String SQL_SELECT_NUMBER_TASK_PROJECT_OF_EMPLOYEE = "Select projects.id as id, projects.title as name, (count(1)-count(case when tasks.id is null then 1 end)) as number from tasks RIGHT JOIN projects ON tasks.project_id = projects.id where projects.id in (select pro_id from perofproject where employee_id = ?) group by projects.id,projects.title;";
    private static String SQL_SELECT_TASK_OF_EMPLOYEE_IN_PROJECT = "select employees.id as id, CONCAT(employees.last_name,' ',employees.first_name) as name, aaa.num as number from employees RIGHT JOIN (select tem.employee_id,NULLIF(case when tem2.num is null then 0 else tem2.num end,-1) as num from (select pro_id,employee_id from perofproject group by employee_id,pro_id) AS tem LEFT JOIN (select project_id,employee_assignee,count(1) as num from tasks group by tasks.employee_assignee,tasks.project_id) as tem2 on tem.pro_id = tem2.project_id and tem.employee_id = tem2.employee_assignee where tem.pro_id=?" +
            ") as aaa on employees.id = aaa.employee_id;";
    private static String SQL_SELECT_COUNT_TASK_CREATE_BY_ME = "SELECT state, COUNT(1) as number FROM tasks WHERE employee_creator = ? GROUP BY state;";
    private static String SQL_SELECT_COUNT_TASK_ASSIGN_TO_ME = "SELECT state, COUNT(1) as number FROM tasks WHERE employee_assignee = ? GROUP BY state;";
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
                    task.getUpdatedAt(),
                    task.getPreTaskId()
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
    public List<Task> getTasksByAssigneeAndCreator(Long projectId, Long employeeAssignee, Long employeeCreator) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(Task[].class,SQl_SELECT_TASK_BY_ASSIGNEE_AND_CREATOR, employeeAssignee, employeeCreator,projectId);
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
        databaseHelper.executeNonQuery(SQL_UPDATE_POINT, point, System.currentTimeMillis(), taskId);//, creatorId
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
    public void updateAssigneeToOwner(Long projectId, Long owner, Long assigneeId, Long updatedAt) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_ASSIGNEE_TO_OWNER, owner, updatedAt, assigneeId, projectId);
    }

    @Override
    public void updateCreatorToOwner(Long projectId, Long owner, Long creatorId, Long updatedAt) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_CREATOR_TO_OWNER, owner, updatedAt, creatorId, projectId);
    }

    @Override
    public void deleteTask(Long taskId) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_DELETE_TASK , taskId);
    }

    @Override
    public void updatePreTask(Long taskId, String preTask) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_PRETASK, preTask , taskId);
    }

    @Override
    public void updateTask(Task task) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_UPDATE_TASK,
                task.getEmployeeAssignee(),
                task.getTitle(),
                task.getDescription(),
                task.getPreTaskId(),
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

    @Override
    public List<QueryReport> selectNumberTaskOfProject() throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(QueryReport[].class, SQL_SELECT_NUMBER_TASK_PROJECT);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[selectNumberTaskOfProject]",e);
            throw e;
        }
    }

    @Override
    public List<QueryReport> selectNumberTaskOfProjectOfEmployee(Long employeeId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(QueryReport[].class, SQL_SELECT_NUMBER_TASK_PROJECT_OF_EMPLOYEE, employeeId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[selectNumberTaskOfProjectOfEmployee]",e);
            throw e;
        }
    }

    @Override
    public List<QueryReport> selectNumberTaskOfEmployeeInProject(Long projectId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(QueryReport[].class, SQL_SELECT_TASK_OF_EMPLOYEE_IN_PROJECT, projectId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[selectNumberTaskOfEmployeeInProject]",e);
            throw e;
        }
    }

    @Override
    public List<CountStateReport> selectCountStateTaskCreateByMe(Long userId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(CountStateReport[].class, SQL_SELECT_COUNT_TASK_CREATE_BY_ME, userId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[selectCountStateTaskCreateByMe]",e);
            throw e;
        }
    }

    @Override
    public List<CountStateReport> selectCountStateTaskAssignToMe(Long userId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(CountStateReport[].class, SQL_SELECT_COUNT_TASK_ASSIGN_TO_ME, userId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[selectCountStateTaskCreateByMe]",e);
            throw e;
        }
    }
}
