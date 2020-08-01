package com.hcmute.pose.projectservice.dao.project.impl;

import com.hcmute.pose.database.connector.exception.TransactionException;
import com.hcmute.pose.database.connector.helper.DatabaseHelper;
import com.hcmute.pose.genuid.GenerateUID;
import com.hcmute.pose.projectservice.dao.project.PerOfProjectDao;
import com.hcmute.pose.projectservice.model.project.PerOfProject;
import com.hcmute.pose.projectservice.model.project.ProjectRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
@Repository
public class PreOfProjectDaoImpl implements PerOfProjectDao {
    private static Logger LOGGER = LoggerFactory.getLogger(PerOfProjectDao.class);
    private static String SQL_INSERT_POP = "INSERT INTO perofproject(pro_id, employee_id, role) VALUES(?,?,?)";
    private static String SQL_GET_LIST_POP = "SELECT * FROM perofproject WHERE pro_id =?";
    private static String SQL_DELETE_POP = "DELETE FROM perofproject WHERE pro_id=? AND employee_id=? AND role != ?";
    private static String SQL_GET_PROJECT_WITH_ROLE = "SELECT * FROM perofproject WHERE employee_id = ? AND role = ?";
    private static String SQL_GET_PROJECT_WITHOUT_ROLE = "SELECT * FROM perofproject WHERE employee_id = ? AND role != ?";
    private static String SQL_GET_PER_OF_PROJECT_WITH_ROLE = "SELECT * FROM perofproject WHERE pro_id = ? AND role = ?";

    @Autowired
    private DatabaseHelper databaseHelper;

    @Autowired
    private GenerateUID generateUID;

    @Override
    public Optional<Long> getLastID() {
        return generateUID.genUID();
    }

    @Override
    public Optional<PerOfProject> createPOP(PerOfProject perOfProject) {
        try {
            databaseHelper.executeNonQuery(SQL_INSERT_POP,
                    perOfProject.getProjectId(),
                    perOfProject.getEmployeeId(),
                    perOfProject.getRole().ordinal()
            );
            return Optional.of(perOfProject);
        } catch (SQLException | TransactionException e) {
            LOGGER.error("[POPDaoImpl]:[createPOP]", e);
            return Optional.empty();
        }
    }

    @Override
    public List<PerOfProject> getListPOP(Long projectId) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(PerOfProject[].class, SQL_GET_LIST_POP, projectId);
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getListPOP]", e);
            throw e;
        }
    }

    @Override
    public void deletePOP(Long projectId, Long employeeId) throws SQLException, TransactionException {
        databaseHelper.executeNonQuery(SQL_DELETE_POP, projectId, employeeId, ProjectRole.OWNER.ordinal());
    }

    @Override
    public List<PerOfProject> getListWithRole(Long employeeId, ProjectRole role) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(PerOfProject[].class, SQL_GET_PROJECT_WITH_ROLE, employeeId, role.ordinal());
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getListOwner]", e);
            throw e;
        }
    }

    @Override
    public List<PerOfProject> getUserWithRole(Long projectId, ProjectRole role) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(PerOfProject[].class, SQL_GET_PER_OF_PROJECT_WITH_ROLE, projectId, role.ordinal());
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getListOwner]", e);
            throw e;
        }
    }

    @Override
    public List<PerOfProject> getListWithoutRole(Long employeeId, ProjectRole role) throws SQLException {
        try {
            return databaseHelper.executeQueryListObject(PerOfProject[].class, SQL_GET_PROJECT_WITHOUT_ROLE, employeeId, role.ordinal());
        } catch (SQLException e) {
            LOGGER.error("[TaskDaoImpl]:[getListOwner]", e);
            throw e;
        }
    }
}
