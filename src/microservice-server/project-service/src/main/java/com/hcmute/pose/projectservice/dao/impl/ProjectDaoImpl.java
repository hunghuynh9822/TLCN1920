package com.hcmute.pose.projectservice.dao.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.projectservice.dao.ProjectDao;
import com.hcmute.pose.projectservice.model.Project;
import com.hcmute.pose.projectservice.model.ProjectState;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
@Repository
public class ProjectDaoImpl implements ProjectDao {
    private static Logger LOGGER = LoggerFactory.getLogger(ProjectDao.class);
    private static String SQL_INSERT_PROJECTS = "INSERT INTO projects(id, title, description, state, created_at, updated_at) VALUES(?,?,?,?,?,?)";
    private static String SQl_GET_LIST_PRO = "SELECT * FROM projects";
    private static String SQl_GET_PROJECT = "SELECT * FROM projects WHERE id = ?";
    private static String SQL_UPDATE_PROJECT = "UPDATE projects SET title=?, description=?, state=?, updated_at=? WHERE id=?";
    private static String SQL_UPDATE_PROJECT_STATE = "UPDATE projects SET state=? WHERE id=?";

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
    public Optional<Project> getProject(Long id) {
        try {
            return Optional.of(databaseHelper.executeQueryListObject(Project[].class, SQl_GET_PROJECT, id).get(0));
        } catch (SQLException e) {
            LOGGER.error("[ProjectDaoImpl]:[getProject]",e);
            return Optional.empty();
        }
    }
}
