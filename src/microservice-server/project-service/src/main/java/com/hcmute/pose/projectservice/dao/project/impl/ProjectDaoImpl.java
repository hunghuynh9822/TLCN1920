package com.hcmute.pose.projectservice.dao.project.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.projectservice.dao.project.ProjectDao;
import com.hcmute.pose.projectservice.model.project.Project;
import com.hcmute.pose.projectservice.model.project.ProjectState;
import com.hcmute.pose.projectservice.modelmap.IntValue;
import com.hcmute.pose.projectservice.modelmap.QueryReport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Repository
public class ProjectDaoImpl implements ProjectDao {
    private static Logger LOGGER = LoggerFactory.getLogger(ProjectDao.class);
    private static String SQL_INSERT_PROJECTS = "INSERT INTO projects(id, title, description, state, created_at, updated_at) VALUES(?,?,?,?,?,?)";
    private static String SQl_GET_LIST_PRO = "SELECT * FROM projects";
    private static String SQl_GET_PROJECT = "SELECT * FROM projects WHERE id = ?";
    private static String SQL_UPDATE_PROJECT = "UPDATE projects SET title=?, description=?, state=?, updated_at=? WHERE id=?";
    private static String SQL_UPDATE_PROJECT_STATE = "UPDATE projects SET state=? WHERE id=?";
    private static String SQL_DELETE_PROJECT = "DELETE FROM projects WHERE id=?;";
    //report
    private static String SQl_GET_LIST_EMPLOYEE_SORT = "select employees.id as id,NULLIF(case when num is null then 0 else num end,-1) as number from employees LEFT JOIN (select employee_assignee,sum(1) as num from tasks group by employee_assignee) as aa on employees.id = aa.employee_assignee ORDER BY number asc;";
    private static String SQl_GET_LIST_PRO_SORT = "select projects.id as id,title as name ,NULLIF(case when num is null then 0 else num end,-1) as number from projects LEFT JOIN (select project_id,sum(1) as num from tasks group by project_id) as aa on projects.id = aa.project_id ORDER BY number desc;";
    private static String SQL_SELECT_TASK_EMPLOYEE_IN_PROJECT = "select employees.id as id, CONCAT(employees.last_name,' ',employees.first_name) as name, NULLIF(case when aaa.num is null then 0 else aaa.num end,-1) as number from employees LEFT JOIN (select tem.employee_id,NULLIF(case when tem2.num is null then 0 else tem2.num end,-1) as num from (select pro_id,employee_id from perofproject group by employee_id,pro_id) AS tem LEFT JOIN (select project_id,employee_assignee,count(1) as num from tasks group by tasks.employee_assignee,tasks.project_id) as tem2 on tem.pro_id = tem2.project_id and tem.employee_id = tem2.employee_assignee where tem.pro_id=?" +
            ") as aaa on employees.id = aaa.employee_id;";
    private static String SQl_GET_COUNT_PROJECTS = "select count(1) as value from projects;";
    private static String SQl_GET_COUNT_EMLPYEES = "select count(1) as value from employees;";
    private static String SQl_GET_COUNT_REQUESTS = "select count(1) as value from requests;";
    private static String SQl_GET_COUNT_NOTIFY = "select count(1) as value from (select count(1) from notify group by content) as Notify_Count;;";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastID() {
        return generateUID.genUID();
    }

    @Override
    public Optional<Project> createPro(Project project) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_PROJECTS,
                    project.getId(),
                    project.getTitle(),
                    project.getDescription(),
                    project.getState().ordinal(),
                    project.getCreatedAt(),
                    project.getUpdatedAt()
            );
            return Optional.of(project);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[ProjectDaoImpl]:[createPro]", e);
            return Optional.empty();
        }
    }

    @Override
    public List<Project> getListPro() throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(Project[].class,SQl_GET_LIST_PRO);
        } catch (SQLException e) {
            LOGGER.error("[ProjectDaoImpl]:[getListPro]",e);
            throw e;
        }
    }

    @Override
    public void updateProject(Project project) throws SQLException, TransactionException {
        try {
            databaseHelper.executeNonQuery(SQL_UPDATE_PROJECT,
                    project.getTitle(),
                    project.getDescription(),
                    project.getState().ordinal(),
                    project.getUpdatedAt(),
                    project.getId()
            );
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[ProjectDaoImpl]:[updateProject]", e);
            throw e;
        }
    }

    @Override
    public void updateState(Long id, ProjectState state) throws SQLException, TransactionException {
        try {
            databaseHelper.executeNonQuery(SQL_UPDATE_PROJECT_STATE,
                    state.ordinal(),
                    id
            );
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[ProjectDaoImpl]:[updateState]", e);
            throw e;
        }
    }

    @Override
    public void deleteProject(Long id) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_DELETE_PROJECT, id);
    }

    @Override
    public Optional<Project> getProject(Long id) {
        try {
            return Optional.of(databaseHelper.executeQueryListObject(Project[].class, SQl_GET_PROJECT, id).get(0));
        } catch (SQLException e) {
            LOGGER.error("[ProjectDaoImpl]:[getProject]",e);
            return Optional.empty();
        }
    }

    @Override
    public Map<String, Object> get_report() throws SQLException {
        Map<String , Object> report = new HashMap<>();
        Optional<IntValue> project = databaseHelper.executeQueryObject(IntValue.class, SQl_GET_COUNT_PROJECTS);
        Optional<IntValue> employee = databaseHelper.executeQueryObject(IntValue.class, SQl_GET_COUNT_EMLPYEES);
        Optional<IntValue> request = databaseHelper.executeQueryObject(IntValue.class, SQl_GET_COUNT_REQUESTS);
        Optional<IntValue> notify = databaseHelper.executeQueryObject(IntValue.class, SQl_GET_COUNT_NOTIFY);
        report.put("project", project.get().getValue());
        report.put("employee", employee.get().getValue());
        report.put("request", request.get().getValue());
        report.put("notify", notify.get().getValue());
        return report;
    }

    @Override
    public List<QueryReport> getListProSort() throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(QueryReport[].class,SQl_GET_LIST_PRO_SORT);
        } catch (SQLException e) {
            LOGGER.error("[ProjectDaoImpl]:[getListProSort]",e);
            throw e;
        }
    }

    @Override
    public List<QueryReport> getListEmployeeSort() throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(QueryReport[].class,SQl_GET_LIST_EMPLOYEE_SORT);
        } catch (SQLException e) {
            LOGGER.error("[ProjectDaoImpl]:[getListEmployeeSort]",e);
            throw e;
        }
    }

    @Override
    public List<QueryReport> selectNumberTaskOfEmployeeInProject(Long projectId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(QueryReport[].class, SQL_SELECT_TASK_EMPLOYEE_IN_PROJECT, projectId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[selectNumberTaskOfEmployeeInProject]",e);
            throw e;
        }
    }
}
